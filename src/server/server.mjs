import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import cors from "cors"
import {
    changeFormerUsername,
    getPlayerIndex,
    getRoom,
    getUserName,
    isRoomNameTaken,
    nextPlayer,
    processEndOfRound,
    processNewConnection,
    removeUser,
    updateRoomState
} from "./serverFunctions.mjs";
import {
    getInitialLocations
} from "../components/functions/initialStates/initialStateFunctions.mjs";
import cloneDeep from "lodash/cloneDeep.js";
import {TRANSMISSIONS} from "../components/functions/lists.mjs";
import getInitialPlayerStates from "../components/functions/initialStates/initialPlayerStates.mjs";
import {getInitialStore} from "../components/functions/initialStates/initialStore.mjs";
import {getInitialLegends} from "../components/functions/initialStates/initialLegends.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app);

let users = [];
let gameRooms = [];

const io = socketIO(server);
io.on("connection", socket => {

    /** HAND SHAKE **/
    socket.on(TRANSMISSIONS.handShake, username => {
        if (username) {
            console.debug("* shaking hand with " + username);
            users = processNewConnection(username, socket.id, users);
            io.emit(TRANSMISSIONS.currentUsersAndData, {
                users: users,
                rooms: gameRooms,
                socketRooms: io.sockets.adapter.rooms
            });
        }
    });

    /** NEW GAME ROOM **/
    socket.on(TRANSMISSIONS.createGame, roomData => {
        //check if the name is existing
        if (!isRoomNameTaken(roomData, gameRooms)) {
            const numOfPlayers = roomData.numOfPlayers;
            const states = {
                numOfPlayers: numOfPlayers,
                playerStates: getInitialPlayerStates(numOfPlayers),
                store: getInitialStore(),
                locations: getInitialLocations(numOfPlayers),
                legends: getInitialLegends(numOfPlayers),
                activePlayer: 0,
                initialPlayer: 0,
                previousPlayer: 0,
                round: 1,
                gameLog: [],
                roomName: roomData.roomName,
            };
            gameRooms.push({
                name: roomData.roomName,
                numOfPlayers: roomData.numOfPlayers,
                players: [getUserName(socket.id, users)],
                states: states,
                previousStates: states,
            });
            console.debug("new room created (" + gameRooms[gameRooms.length - 1].name + "[" + gameRooms[gameRooms.length - 1].players + "])");
            socket.join(roomData.roomName);

            io.emit(TRANSMISSIONS.currentUsersAndData, {
                users: users,
                rooms: gameRooms,
                socketRooms: io.sockets.adapter.rooms
            })
        } else {
            socket.emit(TRANSMISSIONS.roomNameAlreadyExists, {});
            console.debug("room with this name already exists");
        }
    });

    /** JOIN A GAME **/
    socket.on(TRANSMISSIONS.joinGame, data => {
        let roomName = data.room.name;
        for (let room of gameRooms) {
            if (room.name === roomName) {
                if (room.players.length < room.numOfPlayers) {
                    room.players.push(getUserName(socket.id, users));
                    console.debug(getUserName(socket.id, users));
                    socket.join(roomName);
                    io.emit(TRANSMISSIONS.currentUsersAndData, {
                        users: users,
                        rooms: gameRooms,
                        socketRooms: io.sockets.adapter.rooms
                    });
                    console.debug("Player joined room " + roomName + "[" + room.players + "]");
                } else {
                    socket.emit(TRANSMISSIONS.roomIsFull, {rooms: gameRooms});
                    console.debug("Room full " + roomName + "[" + room.players + "]");
                }
            }
        }
    });

    /** START GAME **/
    socket.on(TRANSMISSIONS.startGame, data => {
        const roomName = data.roomName;
        let room = getRoom(roomName, gameRooms);
        socket.join(data.roomName);

        io.to(roomName).emit(TRANSMISSIONS.startGame, {room: room});
        console.debug("New game data sent to: " + roomName + " [" + room.players + "]");
    });

    /** SEND GAME STATES **/
    socket.on(TRANSMISSIONS.sendGameStates, data => {
        const room = getRoom(data.roomName, gameRooms);
        if (room) {
            const userName = room.players[data.playerIndex];
            console.debug("* shaking hand with " + userName);
            users = processNewConnection(userName, socket.id, users);
            socket.join(data.roomName);
            console.debug("Game states required for room: " + room.name + " by user " + getUserName(socket.id,
                users));
            socket.emit(TRANSMISSIONS.stateUpdate, {
                playerStates: room.states.playerStates,
                store: room.states.store,
                locations: room.states.locations,
                round: room.states.round,
                legends: room.states.legends,
                activePlayer: room.states.activePlayer,
                previousPlayer: room.states.previousPlayer,
                gameLog: room.states.gameLog,
                numOfPlayers: room.states.numOfPlayers,
            })
        } else {
            console.error("Couldn't find room during requested status update:" + data.roomName);
        }
    });

    /** RESET TURN **/
    socket.on(TRANSMISSIONS.resetTurn, roomName => {
        console.debug("resetting turn in room: " + roomName + "(" + getUserName(socket.id, users) + "|" + socket.id + ")");
        const room = getRoom(roomName, gameRooms);
        console.log("room: " + room);
        if (room) {
            socket.emit(TRANSMISSIONS.stateUpdate, {
                playerStates: room.states.playerStates,
                store: room.states.store,
                locations: room.states.locations,
                round: room.states.round,
                legends: room.states.legends,
                activePlayer: room.states.activePlayer,
                previousPlayer: room.states.previousPlayer,
                gameLog: room.states.gameLog,
                numOfPlayers: room.states.numOfPlayers,
            })
        } else {
            console.error("Room could not be found, turn was not passed.");
        }
    });

    /** REVERT TURN **/
    socket.on(TRANSMISSIONS.revert, roomName => {
        console.debug("reverting turn in room: " + roomName + "(" + getUserName(socket.id, users) + "|" + socket.id + ")");
        const room = getRoom(roomName, gameRooms);
        console.log("room: " + room);
        if (room) {
            room.states = cloneDeep(room.previousStates);
            updateStatesToAll(room);
        } else {
            console.error("Room could not be found, turn was not passed.");
        }
    });


    /** NEXT PLAYER **/
    socket.on(TRANSMISSIONS.nextPlayer, states => {
        console.debug("Passing turn to next player in room: " + states.roomName + "(" + getUserName(socket.id, users) + ")");
        let room = getRoom(states.roomName, gameRooms);
        room.previousStates = cloneDeep(room.states);
        if (room) {
            let playerIndex = room.players.indexOf(getUserName(socket.id, users));
            console.debug("PLAYER " + (playerIndex) + " passing action.");
            room = updateRoomState(room, playerIndex, states);
            updateStatesToAll(room);
            console.debug("States updated");
        } else {
            console.error("Room could not be found, turn was not passed.");
        }
    });

    /** End of round**/
    socket.on(TRANSMISSIONS.finishedRound, states => {
        let room = getRoom(states.roomName, gameRooms);
        room.previousStates = cloneDeep(room.state);
        let playerIndex = room.players.indexOf(getUserName(socket.id, users));
        for (let playerState of room.states.playerStates) {
            console.debug("Has player " + playerState.playerIndex + " finished round?" + playerState.finishedRound);
        }
        console.debug("end of round initiated by player: " + playerIndex + "(" + getUserName(socket.id, users) + ")");
        if (playerIndex !== -1) {
            room = updateRoomState(room, playerIndex, states);
            room.states.playerStates[playerIndex].finishedRound = true;

            let nextPlayerIndex = playerIndex + 1 < room.numOfPlayers ? playerIndex + 1 : 0;
            let haveAllFinished = true;

            while (playerIndex !== nextPlayerIndex) {
                if (!room.states.playerStates[nextPlayerIndex].finishedRound) {
                    haveAllFinished = false;
                }
                nextPlayerIndex = nextPlayerIndex + 1 < room.numOfPlayers ? nextPlayerIndex + 1 : 0;
            }
            console.debug("have all finished: " + haveAllFinished);

            if (haveAllFinished) {
                if (room.states.round < 5) {
                    room = processEndOfRound(room);
                } else {
                    console.debug("Sending new round states to all players.");
                    io.to(room.name).emit(TRANSMISSIONS.scoringStates, {
                        playerStates: room.states.playerStates,
                        numOfPlayers: room.states.numOfPlayers,
                        legends: room.states.legends,
                    })
                }
            } else {
                room.states.activePlayer = nextPlayer(playerIndex, room);
            }
            room.previousStates = room.states;
            updateStatesToAll(room);
        } else {
            console.error("Unable to process user - possible disconnection. Socket id: " + socket.id);
        }
    });

    /**  SEND BACK SCORING STATES **/
    socket.on(TRANSMISSIONS.sendScoringStates, (data) => {
        const room = getRoom(data.roomName, gameRooms);
        if (room) {
            const userName = room.players[data.playerIndex];
            console.debug("* shaking hand with " + userName);
            users = processNewConnection(userName, socket.id, users);
            socket.join(data.roomName);
            console.debug("Scoring states required for room: " + room.name + " by user " + getUserName(socket.id,
                users));
            socket.emit(TRANSMISSIONS.scoringStates, {
                playerStates: room.states.playerStates,
                legends: room.states.legends,
            })
        } else {
            console.error("Couldn't find room during requested scoring update:" + data.roomName);
        }
    });


    /** JOIN ROOM **/
    //todo: duplicate?
    /*socket.on(TRANSMISSIONS.joinGame, data => {
        console.debug(data.roomName);
    });*/

    /** DELETE ROOM **/
    socket.on(TRANSMISSIONS.deleteRoom, data => {
        for (let i = 0; i < gameRooms.length; i++) {
            if (gameRooms[i].name === data.roomName) {
                gameRooms.splice(i, 1);
                console.debug("game room " + data.roomName + " deleted.");
            }
        }
        io.emit(TRANSMISSIONS.currentUsersAndData, {
            users: users,
            rooms: gameRooms,
            socketRooms: io.sockets.adapter.rooms
        });
    });

    /** USERNAME CHANGE **/
    socket.on(TRANSMISSIONS.usernameChanged, data => {
        console.debug("Changing username");
        const changeResult = changeFormerUsername(data.formerUsername, data.newUsername, users, gameRooms);
        users = changeResult.users;
        gameRooms = changeResult.gamerooms;
        io.emit(TRANSMISSIONS.currentUsersAndData, {
            users: users,
            rooms: gameRooms,
            socketRooms: io.sockets.adapter.rooms
        });
    });

    /** DISCONNECT **/
    socket.on("disconnect", reason => {
        console.debug("Client " + socket.id + " disconnected.");
        console.debug("Reason: " + reason);
        const removalResult = removeUser(users, socket.id);
        users = removalResult.users;
        io.emit(TRANSMISSIONS.currentUsersAndData, {users: users, rooms: gameRooms});
        /*console.debug("actual rooms");
        for (let room of gameRooms) {
            console.debug(room.name + "[" + room.players + "]");
        }*/
    });


    function updateStatesToAll(room) {
        console.debug("Updating states to all players.");
        io.to(room.name).emit(TRANSMISSIONS.stateUpdate, {
            playerStates: room.states.playerStates,
            store: room.states.store,
            locations: room.states.locations,
            round: room.states.round,
            legends: room.states.legends,
            activePlayer: room.states.activePlayer,
            previousPlayer: room.states.previousPlayer,
            gameLog: room.states.gameLog,
            numOfPlayers: room.states.numOfPlayers,
        })
    }

});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.debug(`Listening on port ${port}`));