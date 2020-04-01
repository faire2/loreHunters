import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import cors from "cors"
import getInitialPlayerStates, {
    getInitialLocations,
    getInitialStoreItems
} from "../components/functions/initialStateFunctions.mjs";
import {TRANSMISSIONS} from "../data/idLists.mjs";
import addPlayer from "./addPlayer.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app)

let playerStates = getInitialPlayerStates();
let store = getInitialStoreItems();
let locations = getInitialLocations();
let round = 1;
let players = [];

const io = socketIO(server);
io.on("connection", socket => {
    console.log("New client connected: " + socket.id);
    players = addPlayer(players, socket.id);
    socket.emit(TRANSMISSIONS.getStates, {
        playerState: playerStates[players.indexOf(socket.id)],
        store: store,
        locations: locations,
        round: round
    });
    console.log("Emitted playerstate to player no. " + players.indexOf(socket.id));

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