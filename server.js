if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 8000

var io = require('socket.io')()
var Stopwatch = require('timer-stopwatch');
var timer = new Stopwatch(600000)
// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    timer.start()
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', timer.ms);
    }, interval);
  });
});

io.on('connection', function(socket){
  socket.on('vote1', function(msg){
    io.emit('vote1', msg);
  });
  socket.on('vote2', function(msg){
    io.emit('vote2', msg);
  });
  socket.on('response1', function(msg){
    io.emit('response1', msg);
  });
  socket.on('response2', function(msg){
    io.emit('response2', msg);
  });
  socket.on('topic', function(msg){
    io.emit('topic', msg);
  });
});

io.listen(process.env.PORT || 8001);
console.log('listening on port2 ', port2);
