const express = require("express");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
// localhost  server port
const port = process.env.PORT || 4001;
const app = express();

// server instance
const server = http.createServer(app);

// socket with an instance of the server
const io = socketIO(server);
/*io.set('origins', '*:*');*/


io.on("connection", socket => {
    console.log("New client connected");

    socket.on("test", data => {
        console.log("test received");
        io.sockets.emit("test response", "response")
    });
});

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

server.listen(port, () => console.log(`Listening on port ${port}`));

