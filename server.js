const express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let bodyParser = require('body-parser');

app.use(express.static('static/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

let protocol;

app.get('/submit', (req, res) => {
    io.emit('scan', req.query.data);
    res.status(200).end();
});

http.listen(8080, () => {
    console.log('Listening on 8080...');
});