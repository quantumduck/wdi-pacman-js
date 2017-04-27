// Setup initial game stats
// var powerPellets = 4;
var globalchoices;
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

var ghostHouseBounds = [20, 34, 12, 16];

// Define your ghosts here
var pacMan = {
  score: 0,
  lives: 2,
  position: [26,23],
  home: [26,23],
  direction: 'Left',
  sprite: '(V)'
};

var inky = {
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false,
  position: [26,11],
  home: [26, 14],
  target: [48, -2],
  direction: 'Left',
  sprite: '/I\\'
};
var blinky = {
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false,
  position: [22,14],
  home: [22,14],
  target: [54, 32],
  direction: 'Right',
  sprite: '/B\\'
};
var pinky = {
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false,
  position: [28,14],
  home: [28,14],
  target: [6, -2],
  direction: 'Up',
  sprite: '/P\\'
};
var clyde = {
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false,
  position: [32,14],
  home: [32,14],
  target: [0, 32],
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
  // console.log(ghosts[0].name + '\'s Position:' + ghosts[0].position [0] + ',' + ghosts[0].position[1]);

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



// Menu Options

function nextPosition(x, y, direction) {
  var newx = x;
  var newy = y;
  var youSee = 'nothing';
  switch (direction) {
    case 'Left':
      newx -= 2;
      break;
    case 'Right':
      newx += 2;
      break;
    case 'Up':
      newy -= 1;
      break;
    case 'Down':
      newy += 1;
      break;
  }
  if (currentBoard[newy][newx] === 'X') {
    // abort the move (wall)
    newx = x;
    newy = y;
  }
  else if (currentBoard[newy][newx] === '=') {
    if (direction != 'Up') {
      // ghosts can leave, but can't enter ghost house
      newx = x;
      newy = y;
     }
  } else if (newx > 52) {
    // Warp left
    newx = 2;
  } else if (newx < 2) {
    // Warp right
    newx = 52;
  }
  return [newx, newy];
}

function move(character) {
  var direction = character.direction;
  var x = character.position[0];
  var y = character.position[1];
  character.position = nextPosition(x, y, direction);
}

function eat(position) {
  var x = position[0];
  var y = position[1];
  for (var i = 0; i < ghosts.length; i++) {
    if ((x === ghosts[i].position[0]) && (y === ghosts[i].position[1])) {
      eatGhost(ghosts[i]);
    }
  }
  switch (currentBoard[y][x]) {
    case '@':
      pacMan.score += 40;
      eatPowerPellet();
    case 'o':
      pacMan.score += 10;
      eatDot(position);
      break;
    default:
  }
}

function eatDot(position) {
  var x = position[0];
  var y = position[1];
  console.log('\nChomp!');
  currentBoard[y] = currentBoard[y].substring(0,x)
                  + ' '
                  + currentBoard[y].substring(x + 1, currentBoard[y].length);
}

function eatPowerPellet() {
  for(var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
    ghosts[i].direction = reverse(ghosts[i].direction);
  }
}

function eatGhost(ghost) {
  if (ghost.edible) {
    ghost.edible = false;
    pacMan.score += 200;
    ghost.position = ghost.home;
    console.log('\nCHOMP!\nYou ate ' + ghost.name + ' (the ' + ghost.character + ' ghost).');
  } else {
    console.log('\nCHOMP!\n' + ghost.name + ' (the ' + ghost.colour + ' one) ate YOU!')
    killPacMan();
  }
}

function killPacMan() {
  pacMan.lives--;
  pacMan.position = pacMan.home;
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].position = ghosts[i].home;
  }
  if (pacMan.lives < 0) {
    process.exit();
  }
}

// Ghost AI:

function inHouse(ghost) {
  x = ghost.position[0];
  y = ghost.position[1];
  if (x < ghostHouseBounds[0]) {
    return false;
  }
  if (x > ghostHouseBounds[1]) {
    return false;
  }
  if (y < ghostHouseBounds[2]) {
    return false;
  }
  if (y > ghostHouseBounds[3]) {
    return false;
  }
  return true;
}

function retarget(ghost) {
  if (inHouse(ghost)) {
    // If the ghost is in the ghost house, it's goal is to leave.
    if (ghost.position[0] < 27) {
      ghost.target = [26, 11];
    } else {
      ghost.target = [28, 11];
    }
  } else {
    switch (ghost.character) {
      case 'Shadow':
      ghost.target = pacMan.position;
      break;
    }
  }
}

function ghostMove(ghost) {
  var choices = findForks(ghost.position, ghost.direction);
  retarget(ghost);
  var target = ghost.target;
  if (choices.length === 1) {
    ghost.direction = choices[0];
  } else {
    if (ghost.edible) {
      ghost.direction = choices[Math.floor(Math.random() * choices.length)];
    } else {
      ghost.direction = ghostDecide(ghost.position, ghost.target, choices);
    }
  }
  // while (!move(ghost)) {
  //   ghost.direction = rotateClockwise(ghost.direction);
  // }
  move(ghost);
  if (ghost.position == pacMan.position) {
    eatGhost(ghost);
  }
}

function rotateClockwise(direction) {
  switch(direction) {
    case 'Left':
      return 'Up';
    case 'Up':
      return 'Right';
    case 'Right':
      return 'Down';
    case 'Down':
      return 'Left';
  }
}

function reverse(direction) {
  switch(direction) {
    case 'Left':
      return 'Right';
    case 'Up':
      return 'Down';
    case 'Right':
      return 'Left';
    case 'Down':
      return 'Up';
  }
}

function ghostDecide(position, target, directions) {
  var choice = directions[0];
  var px = position[0];
  var py = position[1];
  var tx = target[0];
  var ty = target[1];
  var newPosition = nextPosition(px, py, choice);
  var distance = (Math.abs(tx - newPosition[0]) / 2) + Math.abs(ty - newPosition[1]);
  var minDistance = distance;
  for (var i = 1; i < directions.length; i++) {
    var newPosition = nextPosition(px, py, directions[i]);
    var distance = (Math.abs(tx - newPosition[0]) / 2) + Math.abs(ty - newPosition[1]);
    if (distance < minDistance) {
      choice = directions[i];
      minDistance = distance;
    }
  }
  return choice;
}

function findForks(position, direction) {
  var choices = [];
  var x = position[0];
  var y = position[1];
  switch(direction) {
    case 'Up':
      if (currentBoard[y][x - 2] != 'X') {
        choices.push('Left');
      }
      if (currentBoard[y - 1][x] != 'X') {
        choices.push('Up');
      }
      if (currentBoard[y][x + 2] != 'X') {
        choices.push('Right');
      }
      break;
    case 'Down':
      if (currentBoard[y][x - 2] != 'X') {
        choices.push('Left');
      }
      if ((currentBoard[y + 1][x] != 'X') && (currentBoard[y + 1][x] != '=')) {
        choices.push('Down');
      }
      if (currentBoard[y][x + 2] != 'X') {
        choices.push('Right');
      }
      break;
    case 'Right':
      if ((currentBoard[y + 1][x] != 'X') && (currentBoard[y + 1][x] != '=')) {
        choices.push('Down');
      }
      if (currentBoard[y - 1][x] != 'X') {
        choices.push('Up');
      }
      if (currentBoard[y][x + 2] != 'X') {
        choices.push('Right');
      }
      break;
      case 'Left':
        if (currentBoard[y][x - 2] != 'X') {
          choices.push('Left');
        }
        if (currentBoard[y - 1][x] != 'X') {
          choices.push('Up');
        }
        if ((currentBoard[y + 1][x] != 'X') && (currentBoard[y + 1][x] != '=')) {
          choices.push('Down');
        }
        break;
  }
  globalchoices = choices;
  console.log(choices);
  return choices;
}
// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'a':
      pacMan.direction = 'Left';
      move(pacMan);
      eat(pacMan.position);
      ghostMove(inky);
      break;
    case 'd':
    pacMan.direction = 'Right';
      move(pacMan);
      eat(pacMan.position);
      ghostMove(inky);
      break;
    case 'w':
      pacMan.direction = 'Up';
      move(pacMan);
      eat(pacMan.position);
      ghostMove(inky);
      break;
    case 's':
      pacMan.direction = 'Down';
      move(pacMan);
      eat(pacMan.position);
      ghostMove(inky);
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
