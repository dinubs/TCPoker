var colors = {
  'bold': '1',
  'dim': '2',
  'underlined': '4',
  'invert': '7',  
  'black': '30',
  'red': '31',
  'green': '32',
  'yellow': '33',
  'blue': '34',
  'magenta': '35',
  'cyan': '36',
  'lightGray': '37',
  'darkGray': '90',
  'lightRed': '91',
  'lightGreen': '92',
  'lightYellow': '93',
  'lightBlue': '94',
  'lightMagenta': '95',
  'lightCyan': '96',
  'white': '97',
  'blackBG': '40',
  'redBG': '41',
  'greenBG': '42',
  'yellowBG': '43',
  'blueBG': '44',
  'magentaBG': '45',
  'cyanBG': '46',
  'lightGrayBG': '47',
  'darkGrayBG': '100',
  'lightRedBG': '101',
  'lightGreenBG': '102',
  'lightYellowBG': '103',
  'lightBlueBG': '104',
  'lightMagentaBG': '105',
  'lightCyanBG': '106',
  'whiteBG': '107' 
}

var reset = '\033[0m';

for (var color in colors) {
  String.prototype[color] = new Function(`return '${'\033[' + colors[color] + 'm'}' + this + '${reset}'`);
}
