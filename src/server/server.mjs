import path from 'path';
import http from "http";
import dirname from "es-dirname"
import express from "express";
import socketIO from "socket.io"
import getInitialPlayerStates from "../components/functions/initialStateFunctions.mjs";
import {TRANSMISSIONS} from "../data/idLists.mjs";
import cors from "cors"
import addPlayer from "./addPlayer.mjs";

const __dirname = dirname();
const port = process.env.PORT || 4001;
const app = express();
app.use(cors());
const server = http.createServer(app)

const playerStates = getInitialPlayerStates();
let players = [];

// socket with an instance of the server
const io = socketIO(server);
io.on("connection", socket => {
    console.log("New client connected: " + socket.id);
    players = addPlayer(players, socket.id);
    socket.emit(TRANSMISSIONS.getState, playerStates[players.indexOf(socket.id)]);
    console.log("Emitted playerstate to player no. " + players.indexOf(socket.id));

    socket.on("disconnect", () => {
        console.log("Client " + socket.id + " disconnected. Removing from active players.");
        players.splice(players.indexOf(socket.id), 1, false);
    })
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`));