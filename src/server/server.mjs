import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import cors from "cors"
import {TRANSMISSIONS} from "../data/idLists.mjs";
import addPlayer, {processEndOfRound, resetTransport} from "./serverFunctions.mjs";
import getInitialPlayerStates, {
    getInitialLegends,
    getInitialLocations,
    getInitialStoreItems,
    GLOBAL_VARS
} from "../components/functions/initialStateFunctions.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app)

let players = [];
let playerStates = getInitialPlayerStates();
let store = getInitialStoreItems();
let locations = getInitialLocations();
let legends = getInitialLegends();
let round = 1;
let activePlayer = 0;
let previousPlayer = 0;

const io = socketIO(server);
io.on("connection", socket => {
    players = addPlayer(players, socket.id);
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
    }

    /** NEXT PLAYER **/
    socket.on(TRANSMISSIONS.nextPlayer, states => {
        let playerIndex = players.indexOf(socket.id);
        console.log("PLAYER " + (playerIndex) + " passing action.");
        nextPlayer(playerIndex);
        let tPlayerState = states.playerState;
        tPlayerState = resetTransport(tPlayerState);
        playerStates.splice(playerIndex, 1, tPlayerState);
        store = states.store;
        locations = states.locations;
        legends = states.legends;
        updateStatesToAll();
        console.log("States updated");
    });

    /** NEW GAME **/
    socket.on(TRANSMISSIONS.newGame, () => {
        console.log("*** NEW GAME INITIATED ***");
        newGame();
    })

    /** End of round**/
    socket.on(TRANSMISSIONS.finishedRound, states => {
        let playerIndex = players.indexOf(socket.id);
        for (let playerState of playerStates) {
            console.log("Has player " + playerState.playerIndex + " finished round?" + playerState.finishedRound);
        }
        console.log("end of round initiated");

        let tPlayerState = states.playerState;
        tPlayerState = resetTransport(tPlayerState);
        tPlayerState.finishedRound = true;
        playerStates.splice(playerIndex, 1, tPlayerState);
        store = states.store;
        locations = states.locations;
        legends = states.legends;

        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        let haveAllFinished = true;

        while (playerIndex !== nextPlayerIndex) {
            if (!playerStates[nextPlayerIndex].finishedRound) {
                haveAllFinished = false;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0;
        }
        console.log("have all finished: " + haveAllFinished);

        if (haveAllFinished && round < 5) {
            const processResults = processEndOfRound(playerStates, locations, store, round);
            playerStates = processResults.playerStates;
            locations = processResults.locations;
            store = processResults.store;
            round += 1;
        } else if (round !== 5) {
            nextPlayer(playerIndex);
        } else {
            for (let player of players) {
                io.to(`${player}`).emit(TRANSMISSIONS.scoringStates, {
                    playerStates: playerStates,
                    legends: legends
                })
            }

        }
        updateStatesToAll();
    });

    /** SEND BACK ALL PLAYER STATES **/
    socket.on(TRANSMISSIONS.sendScoringStates, () => {
        console.log("*Sending player states for scoring, length:" + playerStates.length);
        socket.emit(TRANSMISSIONS.scoringStates, {playerStates: playerStates, legends: legends});
    })

    /* DISCONNECT */
    socket.on("disconnect", () => {
        console.log("Client " + socket.id + " disconnected. Removing from active players." + " | [" + players + "]");
        players.splice(players.indexOf(socket.id), 1, null);
    });

    function updateStatesToAll() {
        for (let player of players) {
            io.to(`${player}`).emit(TRANSMISSIONS.stateUpdate, {
                playerState: playerStates[players.indexOf(player)],
                store: store,
                locations: locations,
                round: round,
                legends: legends,
                activePlayer: activePlayer,
                isActivePlayer: players.indexOf(player) === activePlayer,
                previousPlayer: previousPlayer,
                playerStates: playerStates,
            })
        }
    }

    function nextPlayer(playerIndex) {
        previousPlayer = playerIndex;
        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        while (nextPlayerIndex !== playerIndex) {
            if (!playerStates[nextPlayerIndex].finishedRound) {
                activePlayer = nextPlayerIndex;
                console.log("PASSING ACTION TO PLAYER " + (nextPlayerIndex + 1));
                break;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0
        }
    }

    function newGame() {
        playerStates = getInitialPlayerStates();
        store = getInitialStoreItems();
        locations = getInitialLocations();
        legends = getInitialLegends();
        round = 1;
        activePlayer = 0;
    }
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`))

