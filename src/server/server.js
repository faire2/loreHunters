const express = require("express");
const path = require("path");
const http = require("http")
const socketIO = require("socket.io")
const port = process.env.PORT || 3000; // proces... is an environment variable used by heroku

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
io.origins('*:*') // for latest version

app.use(express.static(path.join(__dirname, '../../build')));

console.log(path.join(__dirname, '../../build', 'index.html'))
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'))
});

io.on("connection", socket => {
    console.log("new client");
    socket.on('disconnect', () => console.log('Client disconnected'));
    }
)


app.listen(port, () => console.log(`Listening on port ${port}`));