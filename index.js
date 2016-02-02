'use strict';
const net = require('net');
const Player = require('./player');
const Game = require('./game');
require('./colors');

let game = new Game();

function runCommand(socket, msg) {
  switch (msg) {
    case '\\q': socket.write('You have quit the session.\r\n');    
                socket.destroy();
                break;
    case '\\players': socket.write(`${players.length} players currently online.\r\n`);    
                      break;
    case '': break;
    default: socket.write(`Unknown command: ${msg}\r\n`);
             break;
  }
}

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

server.listen(1337, '127.0.0.1');
