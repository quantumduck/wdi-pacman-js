// Setup initial game stats
var powerPellets = 4;


// strings are 55 chars. There are 31 lines
// This means positions can go from 1 to 26 in x and 1 to 29 in y
var level1Board = ["XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                   "X o o o o o o o o o o o o XXX o o o o o o o o o o o o X",
                   "X o XXXXXXX o XXXXXXXXX o XXX o XXXXXXXXX o XXXXXXX o X",
                   "X @ XXXXXXX o XXXXXXXXX o XXX o XXXXXXXXX o XXXXXXX @ X",
                   "X o XXXXXXX o XXXXXXXXX o XXX o XXXXXXXXX o XXXXXXX o X",
                   "X o o o o o o o o o o o o o o o o o o o o o o o o o o X",
                   "X o XXXXXXX o XXX o XXXXXXXXXXXXXXX o XXX o XXXXXXX o X",
                   "X o XXXXXXX o XXX o XXXXXXXXXXXXXXX o XXX o XXXXXXX o X",
                   "X o o o o o o XXX o o o o XXX o o o o XXX o o o o o o X",
                   "XXXXXXXXXXX o XXXXXXXXX   XXX   XXXXXXXXX o XXXXXXXXXXX",
                   "          X o XXXXXXXXX   XXX   XXXXXXXXX o X          ",
                   "          X o XXX                     XXX o X          ",
                   "          X o XXX   XXXXXX===XXXXXX   XXX o X          ",
                   "XXXXXXXXXXX o XXX   X             X   XXX o XXXXXXXXXXX",
                   "            o       X             X       o            ",
                   "XXXXXXXXXXX o XXX   X             X   XXX o XXXXXXXXXXX",
                   "          X o XXX   XXXXXXXXXXXXXXX   XXX o X          ",
                   "          X o XXX                     XXX o X          ",
                   "          X o XXX   XXXXXXXXXXXXXXX   XXX o X          ",
                   "XXXXXXXXXXX o XXX   XXXXXXXXXXXXXXX   XXX o XXXXXXXXXXX",
                   "X o o o o o o o o o o o o XXX o o o o o o o o o o o o X",
                   "X o XXXXXXX o XXXXXXXXX o XXX o XXXXXXXXX o XXXXXXX o X",
                   "X o XXXXXXX o XXXXXXXXX o XXX o XXXXXXXXX o XXXXXXX o X",
                   "X @ o o XXX o o o o o o o     o o o o o o o XXX o o @ X",
                   "XXXXX o XXX o XXX o XXXXXXXXXXXXXXX o XXX o XXX o XXXXX",
                   "XXXXX o XXX o XXX o XXXXXXXXXXXXXXX o XXX o XXX o XXXXX",
                   "X o o o o o o XXX o o o o XXX o o o o XXX o o o o o o X",
                   "X o XXXXXXXXXXXXXXXXXXX o XXX o XXXXXXXXXXXXXXXXXXX o X",
                   "X o XXXXXXXXXXXXXXXXXXX o XXX o XXXXXXXXXXXXXXXXXXX o X",
                   "X o o o o o o o o o o o o o o o o o o o o o o o o o o X",
                   "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"];

var currentBoard = level1Board; // This lets us reset the level if we need to.


// Define your ghosts here
var pacMan = {
  score: 0,
  lives: 2,
  position: [26,23],
  direction: 'Left',
  sprite: '(V)'
};

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false,
  position: [26,11],
  direction: 'Left',
  sprite: '/I\\'
};
var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false,
  position: [22,14],
  direction: 'Right',
  sprite: '/B\\'
};
var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false,
  position: [28,14],
  direction: 'Up',
  sprite: '/P\\'
};
var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false,
  position: [32,14],
  direction: 'Left',
  sprite: '/C\\'
};
var ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayBoard();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + pacMan.score + '     Lives: ' + pacMan.lives);
  // console.log('\nPower-Pellets: ' + powerPellets)
}

function displayBoard() {
  for (var y = 0; y < currentBoard.length; y++) {
    var line = currentBoard[y];
    for (var i = 0; i < ghosts.length; i++) {
      if (ghosts[i].position[1] == y) {
        line = insertCharacter(line, ghosts[i]);
      }
    }
    if (pacMan.position[1] == y) {
      line = insertCharacter(line, pacMan);
    }
    console.log(line);
  }
}


function insertCharacter(line, character) {
  return line.substring(0, character.position[0] - 1)
       + character.sprite
       + line.substring(character.position[0] + 2, line.length);
}

function displayMenu() {
  console.log('\nCommands:\n');  // each \n creates a new line
  console.log('a: left; d: right; w: up; s: down; q: quit.');
  // console.log('(1) Eat Inky (' + (inky.edible ? 'edible' : 'inedible') + ')');
  // console.log('(2) Eat Blinky (' + (blinky.edible ? 'edible' : 'inedible') + ')');
  // console.log('(3) Eat Pinky (' + (pinky.edible ? 'edible' : 'inedible') + ')');
  // console.log('(4) Eat Clyde (' + (clyde.edible ? 'edible' : 'inedible') + ')');
  // console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}

function goLeft(character) {
  var x = character.position[0];
  var y = character.position[1];
  if (x <= 2) {
    // warp to the right!
    character.position[0] = 52;
  } else if (currentBoard[y][x - 2] === 'X') {
    // Do nothing (wall)
  } else {
    character.position[0] -= 2; // go left two spaces
  }
  // switch (currentBoard[character.position[1]][character.position[0]]) {
  //   case 'o':
  //     eatDot();
  //     break;
  //   case '@':
  //     eatPowerPellet();
  //     break;
  //   default:
  // }
}

// Menu Options
function eatDot() {
  console.log('\nChomp!');
  pacMan.score += 10;
}

function eatPowerPellet() {
  powerPellets--;
  pacMan.score += 50;
  for(var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
  console.log('\nChomp!');
}

function eatGhost(ghost) {
  if (ghost.edible) {
    ghost.edible = false;
    pacMan.score += 200;
    console.log('\nCHOMP!\nYou ate ' + ghost.name + ' (the ' + ghost.character + ' ghost).');
  } else {
    console.log('\nCHOMP!\n' + ghost.name + ' (the ' + ghost.colour + ' one) ate YOU!')
    killPacMan();
  }
}

function killPacMan() {
  pacMan.lives--;
  if (pacMan.lives < 0) {
    process.exit();
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'a':
      goLeft(pacMan);
      break;
    case 'd':
      goRight(pacMan);
      break;
    case 'w':
      goUp(pacMan);
      break;
    case 's':
      goDown(pacMan);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
// resetBoard();
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
