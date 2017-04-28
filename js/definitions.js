// All global variables should be defined in this file!

var paused = false; // Pause refreshing of the screen.
var dotsLeft = 240; // Count of dots and powerPellets needed for win condition.
var powerPellets = 4;
var ghostsEaten = 0; // Count ghosts eaten to raise score.
var fruitThresholds = [170, 100]; // How many dots left to trigger fruit appearing.
var level = 1; // game level
var fruitEaten = ""; // String to display bonus fruit eaten:
var messageNum = 0; // Keep track of messages sent to user.
var renderTimeout = 10; // Refresh the screen every 10ms
var fruitTimeout = 10000; // bonus fruit disappears after 10 seconds
var edibleTimeout = 10000; // ghosts become inedible after 10 seconds
var fruitInsertPosition = [28, 17]; // where to place the fruit.


// strings are 55 chars. There are 31 lines
// This means positions can go from 1 to 26 in x and 1 to 29 in y
// Moves in x are always 2 characters. Moves in y are always 1 line.
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

var currentBoard = level1Board; // This lets us reset the level once complete.

var ghostHouseBounds = [20, 34, 12, 16]; // Lets the ghosts know if they are home.

// Pac-Man shares some attributes and behaviours with the ghosts.
var pacMan = {
  score: 0,
  lives: 2,
  position: [26,23],
  home: [26,23],
  direction: 'Left',
  sprite: '(V)',
  delay: 100
};

// Define your ghosts here
var inky = {
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false,      // Set to true when Pac-Man eats a powerPellet
  position: [26,11],  // current position
  home: [26, 14],     // position to go to when dead.
  target: [48, -2],   // position ghost wants to go to.
  direction: 'Left',  // direction ghost is currently moving.
  sprite: '/I\\',     // How to draw the ghost
  edibleSprite: '/i\\', // How to draw edible version of ghost
  delay: 100  // delay before moving ghost (related to speed)
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
  sprite: '/B\\',
  edibleSprite: '/b\\',
  delay: 100
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
  sprite: '/P\\',
  edibleSprite: '/p\\',
  delay: 100
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
  sprite: '/C\\',
  edibleSprite: '/c\\',
  delay: 100
};
var ghosts = [inky, blinky, pinky, clyde]; // all ghosts


// Bonus fruit are drawn the same as the characters, so they need positions and sprites.
var cherry = {
  name: 'Cherry',
  position: fruitInsertPosition,
  points: 100,
  sprite: '<8 '
};
var strawberry = {
  name: 'Strawberry',
  position: fruitInsertPosition,
  points: 300,
  sprite: '<+ '
};
var orange = {
  name: 'Orange',
  position: fruitInsertPosition,
  points: 500,
  sprite: ' 0 '
};
var apple = {
  name: 'Apple',
  position: fruitInsertPosition,
  points: 700,
  sprite: ' Q '
};
var pineapple = {
  name: 'Pineapple',
  position: fruitInsertPosition,
  points: 1000,
  sprite: '>DD'
};
var spaceship = {
  name: 'Galaxian Spaceship',
  position: fruitInsertPosition,
  points: 2000,
  sprite: '-A-'
};
var bell = {
  name: 'Bell',
  position: fruitInsertPosition,
  points: 3000,
  sprite: '--c'
};
var key = {
  name: 'Key',
  position: fruitInsertPosition,
  points: 5000,
  sprite: 'qp '
};
// Having a fruit called none makes it easier to erase the fruit when it disappears.
var none = {
  name: 'Nothing',
  position: fruitInsertPosition,
  points: 0,
  sprite: '   '
};
// Array of fruit indexed by level (note that none is put in for level 0)
var bonuses = [none, cherry, strawberry, orange, orange, apple, apple, pineapple, pineapple, spaceship, spaceship, bell, bell, key];
