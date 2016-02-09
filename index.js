'use strict';
const net = require('net');
const Player = require('./player');
const Game = require('./game');
require('./colors');

let game = new Game();

const server = net.createServer(function(socket) {
  let player = new Player(socket, game);
  game.players.push(player);
  
  player.socket.on('close', function() {
    var i = game.players.indexOf(player);
    if (i != -1) {
      game.players.splice(i, 1);
    }
  });
});
console.log(process.env.PORT);
server.listen(process.env.PORT || 1337, '0.0.0.0');
