import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import cors from "cors"
import getInitialPlayerStates, {
    getInitialLocations,
    getInitialStoreItems,
    GLOBAL_VARS
} from "../components/functions/initialStateFunctions.mjs";
import {TRANSMISSIONS} from "../data/idLists.mjs";
import addPlayer from "./addPlayer.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app)

let players = [];
let playerStates = getInitialPlayerStates();
let store = getInitialStoreItems();
let locations = getInitialLocations();
let round = 1;
let activePlayer = 0;

const io = socketIO(server);
io.on("connection", socket => {
    console.log("New client connected: " + socket.id);
    players = addPlayer(players, socket.id);
    socket.emit(TRANSMISSIONS.getStates, {
        playerState: playerStates[players.indexOf(socket.id)],
        store: store,
        locations: locations,
        round: round,
        isActivePlayer: players.indexOf(socket.id) === activePlayer
    });
    console.log("Emitted playerstate to player no. " + players.indexOf(socket.id));

    /* NEXT PLAYER */
    socket.on(TRANSMISSIONS.nextPlayer, (states) => {
        let playerIndex = players.indexOf(socket.id);
        console.log("PLAYER " + (playerIndex) + " passing action.");
        let nextPlayerIndex = playerIndex + 1 < GLOBAL_VARS.numOfPlayers ? playerIndex + 1 : 0;
        while (nextPlayerIndex !== playerIndex) {
            console.log("Has player " + (nextPlayerIndex + 1) + " finished round? " + playerStates[nextPlayerIndex].finishedRound);
            if (!playerStates[nextPlayerIndex].finishedRound) {
                activePlayer = nextPlayerIndex;
                console.log("PASSING ACTION TO PLAYER " + (nextPlayerIndex + 1));
                break;
            }
            nextPlayerIndex = nextPlayerIndex + 1 < GLOBAL_VARS.numOfPlayers ? nextPlayerIndex + 1 : 0
        }
        playerStates.splice(playerIndex, 1, states.playerState);
        store = states.store;
        locations = states.locations;
        for (let player of players) {
            io.to(`${player}`).emit(TRANSMISSIONS.stateUpdate, {
                playerState: playerStates[players.indexOf(player)],
                store: store,
                locations: locations,
                round: round,
                isActivePlayer: players.indexOf(player) === activePlayer
            })
        }
    })

    /* DISCONNECT */
    socket.on("disconnect", () => {
        console.log("Client " + socket.id + " disconnected. Removing from active players.");
        players.splice(players.indexOf(socket.id), 1, false);
    })
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`));