const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const TextClassifier = require('./TextClassifier');
const tc = new TextClassifier();

io.on('connection', function (socket) {
  console.log('a user connected');

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('classifyText', function (msg) {
    socket.emit('classifiedText', tc.classifyText(msg));
  });
});

const port = 8080;
http.listen(port, function () {
  console.log(`Listening on port ${port}`);
});