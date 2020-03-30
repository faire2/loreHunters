import path from 'path';
import { fileURLToPath } from 'url';
import express from "express";
import http from "http"
import socketIO from "socket.io"
import getInitialPlayerStates from "../components/functions/initialStateFunctions.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);

const playerStates = getInitialPlayerStates();
const players = [];

// socket with an instance of the server
const io = socketIO(server);
io.on("connection", socket => {
    console.log("New client connected: " + socket.id);
    // insert player into null position push him to the end
    if (players.length === 0) {
        players.push(socket.id)
    } else {
        for (let i = 0; i < players.length; i++) {
            if (i === players.length - 1 && players[i] !== false) {
                players.push(socket.id);
                break;
            } else if (players[i] === false) {
                players.splice(i, 1, socket.id);
                break;
            }
        }
    }
    console.log("players:" + players);
    io.sockets.emit(TRANSMISSIONS.getState, "brown bear");

    socket.on("test", data => {
        console.log("test received");
        console.log(socket.id);

        /*io.sockets.emit("playerStates", playerStates);*/
    });
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

export const TRANSMISSIONS = Object.freeze({
    getState: "getState"
})