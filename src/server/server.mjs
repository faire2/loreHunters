import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import cors from "cors"
import {TRANSMISSIONS} from "../data/idLists.mjs";
import {
    changeFormerUsername,
    getRoom,
    getUserName,
    isRoomNameTaken,
    nextPlayer,
    processEndOfRound,
    processNewConnection,
    removeUser,
    updateRoomState
} from "./serverFunctions.mjs";
import getInitialPlayerStates, {
    getInitialLegends,
    getInitialLocations,
    getInitialStore
} from "../components/functions/initialStateFunctions.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app);

let users = [];
let gameRooms = [];

const io = socketIO(server);
io.on("connection", socket => {
    /* players = addPlayer(players, socket.id);
     if (players.includes(socket.id)) {
         console.log("New client connected: " + socket.id + " | [" + players + "]");
         socket.emit(TRANSMISSIONS.getStates, {
             playerState: playerStates[players.indexOf(socket.id)],
             store: store,
             locations: locations,
             round: round,
             legends: legends,
             activePlayer: activePlayer,
             previousPlayer: previousPlayer,
             isActivePlayer: players.indexOf(socket.id) === activePlayer,
             playerStates: playerStates,
         });
         console.log("Emitted initial playerstate to player no. " + players.indexOf(socket.id));
     } else {
         console.log("Socket connection refused: " + socket.id);
     }*/

    /** HAND SHAKE **/
    socket.on(TRANSMISSIONS.handShake, username => {
        console.log("* shaking hand with " + username);
        users = processNewConnection(username, socket.id, users);
        io.emit(TRANSMISSIONS.currentUsersAndData, {
            users: users,
            rooms: gameRooms,
            socketRooms: io.sockets.adapter.rooms
        });
    });


    /** NEW GAME ROOM **/
    socket.on(TRANSMISSIONS.createGame, roomData => {
        //check if the name is existing
        if (!isRoomNameTaken(roomData, gameRooms)) {
            gameRooms.push({
                name: roomData.roomName,
                numOfPlayers: roomData.numOfPlayers,
                players: [getUserName(socket.id, users)],
                states: {
                    playerStates: getInitialPlayerStates(roomData.numOfPlayers),
                    store: getInitialStore(),
                    locations: getInitialLocations(roomData.numOfPlayers),
                    legends: getInitialLegends(roomData.numOfPlayers),
                    activePlayer: 0,
                    previousPlayer: 0,
                    round: 1
                },
            });
            console.log("new room created (" + gameRooms[gameRooms.length - 1].name + "[" + gameRooms[gameRooms.length - 1].players + "])");
            socket.join(roomData.roomName);

            io.emit(TRANSMISSIONS.currentUsersAndData, {
                users: users,
                rooms: gameRooms,
                socketRooms: io.sockets.adapter.rooms
            })
        } else {
            socket.emit(TRANSMISSIONS.roomNameAlreadyExists, {});
            console.log("room with this name already exists");
        }
    });

    /** JOIN A GAME **/
    socket.on(TRANSMISSIONS.joinGame, data => {
        let roomName = data.room.name;
        for (let room of gameRooms) {
            if (room.name === roomName) {
                if (room.players.length < room.numOfPlayers) {
                    room.players.push(getUserName(socket.id, users));
                    console.log(getUserName(socket.id, users));
                    socket.join(roomName);
                    io.emit(TRANSMISSIONS.currentUsersAndData, {
                        users: users,
                        rooms: gameRooms,
                        socketRooms: io.sockets.adapter.rooms
                    });
                    console.log("Player joined room " + roomName + "[" + room.players + "]");
                } else {
                    socket.emit(TRANSMISSIONS.roomIsFull, {rooms: gameRooms});
                    console.log("Room full " + roomName + "[" + room.players + "]");
                }
            }
        }
    });

    /* NEW GAME * //todo refactor
    socket.on(TRANSMISSIONS.newGame, () => {
        console.log("*** NEW GAME INITIATED ***");
        newGame();
    })*/

    /** START GAME **/
    socket.on(TRANSMISSIONS.startGame, data => {
        const roomName = data.roomName;
        let room = getRoom(roomName, gameRooms);

        // check that players have joined the socket room
        for (let player of room.players) {
            socket.join(roomName);
        }

        io.to(roomName).emit(TRANSMISSIONS.startGame, {room: room});
        console.log("New game data sent to: " + roomName + " [" + room.players + "]");
    });

    /** SEND INITIAL GAME STATES **/
    socket.on(TRANSMISSIONS.sendGameStates, username => {
        console.log("Game states required by user: " + username);
    });


    /** NEXT PLAYER **/
    socket.on(TRANSMISSIONS.nextPlayer, states => {
        let room = getRoom(states.roomName, gameRooms);
        let playerIndex = room.players.indexOf(getUserName(socket.id, users));
        console.log("PLAYER " + (playerIndex) + " passing action.");
        room = updateRoomState(room, playerIndex, states);
        updateStatesToAll(room);
        console.log("States updated");
    });

    /** End of round**/
    socket.on(TRANSMISSIONS.finishedRound, states => {
        let room = getRoom(states.roomName, gameRooms);
        let playerIndex = room.players.indexOf(getUserName(socket.id, users));
        for (let playerState of room.states.playerStates) {
            console.log("Has player " + playerState.playerIndex + " finished round?" + playerState.finishedRound);
        }
        console.log("end of round initiated");
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
        console.log("have all finished: " + haveAllFinished);

        if (haveAllFinished && room.states.round < 5) {
            room = processEndOfRound(room);
        } else if (room.states.round !== 5) {
            room.states.activePlayer = nextPlayer(playerIndex, room);
        } else {
            io.to(room.name).emit(TRANSMISSIONS.scoringStates, {
                playerStates: room.states.playerStates,
                legends: room.states.legends,
            })
        }
        updateStatesToAll(room);
    });

    /* SEND BACK ALL PLAYER STATES *
    socket.on(TRANSMISSIONS.sendScoringStates, () => {
        console.log("*Sending player states for scoring, length:" + playerStates.length);
        socket.emit(TRANSMISSIONS.scoringStates, {playerStates: playerStates, legends: legends});
    })*/


    /** JOIN ROOM **/
    socket.on(TRANSMISSIONS.joinGame, data => {
        console.log(data.roomName);
    });

    /** DELETE ROOM **/
    socket.on(TRANSMISSIONS.deleteRoom, data => {
        for (let i = 0; i < gameRooms.length; i++) {
            if (gameRooms[i].name === data.roomName) {
                gameRooms.splice(i, 1);
                console.log("game room " + data.roomName+ " deleted.");
            }
        }
        io.emit(TRANSMISSIONS.currentUsersAndData, {users: users, rooms: gameRooms, socketRooms: io.sockets.adapter.rooms});
    });

    /** USERNAME CHAGNES **/
    socket.on(TRANSMISSIONS.usernameChanged, data => {
        console.log("Changing username");
        const changeResult = changeFormerUsername(data.formerUsername, data.newUsername, users, gameRooms);
        users = changeResult.users;
        gameRooms = changeResult.gamerooms;
        io.emit(TRANSMISSIONS.currentUsersAndData, {users: users, rooms: gameRooms, socketRooms: io.sockets.adapter.rooms});
    });

    /** DISCONNECT **/
    socket.on("disconnect", () => {
        console.log("Client " + socket.id + " disconnected.");
        const removalResult = removeUser(users, socket.id);
        users = removalResult.users;
        io.emit(TRANSMISSIONS.currentUsersAndData, {users: users, rooms: gameRooms});
        /*console.log("actual rooms");
        for (let room of gameRooms) {
            console.log(room.name + "[" + room.players + "]");
        }*/
    });


    function updateStatesToAll(room) {
        io.to(room.name).emit(TRANSMISSIONS.stateUpdate, {
            playerStates: room.states.playerStates,
            store: room.states.store,
            locations: room.states.locations,
            round: room.states.round,
            legends: room.states.legends,
            activePlayer: room.states.activePlayer,
            previousPlayer: room.states.previousPlayer,
        })
    }

    /*function newGame() {
        playerStates = getInitialPlayerStates();
        store = getInitialStore();
        locations = getInitialLocations();
        legends = getInitialLegends();
        round = 1;
        activePlayer = 0;
    }*/
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`))