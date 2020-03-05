const express = require('express');
const path = require('path');
const port = process.env.PORT || 8090; // proces... is an environment variable used by heroku
const app = express();

console.log("Dirname: " + __dirname); // __dirname = current working directory (directory where server is runnning)
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../../build')));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get('/ping', function (req, res) {
    return res.send('pong')
});

app.listen(port);