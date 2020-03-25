/*const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");*/
// localhost  server port
import express from "express";
import http from "http"
import socketIO from "socket.io"
import path from "path"
import {getInitialPlayerStates} from "../components/functions/initialStateFunctions.js";

const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
/*const playerStates = getInitialPlayerStates();*/


// socket with an instance of the server
const io = socketIO(server);

io.on("connection", socket => {
    console.log("New client connected");

    socket.on("test", data => {
        console.log("test received");
        io.sockets.emit("test response", "response");
        io.sockets.emit("playerStates", playerStates);
    });
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`));

