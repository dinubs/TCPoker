'use strict';

class Game {
  constructor() {
    this.players = [];
  }

  emit(from) {
    for (let player of this.players) {
      if (from !== player) player.socket.write(`${from.name}: ${from.current_message}\r\n`);
    }
  }
}

module.exports = Game;
