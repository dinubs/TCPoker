'use strict';
require('./colors');

class Player {
  constructor(socket, game) {
    this.has_name = false; // Default has_name to false so we can get the username
    this.current_message = []; // Array for characters in next message
    this.name = ''; // Username
    this.socket = socket; // Reference to socket for speaking back to the client
    this.game = game; // Reference to game for speaking to other clients and game logic
    
    // Introduce ourselves
    this.say_hello();
  
    this.socket.on('data', this.on_data.bind(this));  // Bind data event from socket
  }
  
  setName(name) {
    this.name = name;
  }
  
  // Intro Message
  say_hello() {
    this.socket.write('                Welcome to TCPoker!                \r\n'.greenBG().black());
    this.socket.write('Please enter your username: ');
  }
  
  run_command() {
    if (!this.has_name) {
      this.name = this.current_message;
      this.has_name = true;
      this.socket.write(`Nice to meet you ${this.name}!\r\n`);
      return this.socket.write('To quit the game type \\q and hit return, for the full list of commands type \\help and hit return.\r\n');
    }
    
    if (this.current_message.match(/\\c /)) {
      this.current_message = this.current_message.split('\\c ')[1];
      return this.game.emit(this);
    }
    
    switch (this.current_message) {
      case '\\q': this.socket.write('You have quit the session.\r\n');    
                  this.socket.destroy();
                  break;
      case '\\help': this.socket.write('\\q : Quit the game\r\n\\help : Show this menu\r\n');
                    break;
      case '\\players': this.socket.write(`${this.game.players.length} currently online\r\n`);
                        break;
      default: this.socket.write(`Unknown command: ${this.current_message}\r\n`);
              break;
    }
  }
  
  on_data(data) {
    if (data.toString().indexOf('\r\n') === -1) {
      this.current_message = this.current_message + data.toString();
    }
    this.current_message = data.toString().trim();
    this.run_command();
    this.current_message = '';
  }
}

module.exports = Player;
