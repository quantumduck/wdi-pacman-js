// Main file: contains code start point and functions to respond to user input.

// Responses:
function pacManLeft() {
  pacMan.direction = 'Left';
  move(pacMan);
  eat(pacMan.position);
  setTimeout(drawScreen, 10);
  ghostMove(inky);
}

function pacManRight() {
  pacMan.direction = 'Right';
  move(pacMan);
  eat(pacMan.position);
  setTimeout(drawScreen, 10);
  ghostMove(inky);
}

function pacManDown() {
  pacMan.direction = 'Down';
  move(pacMan);
  eat(pacMan.position);
  setTimeout(drawScreen, 10);
  ghostMove(inky);
}

function pacManUp() {
  pacMan.direction = 'Up';
  move(pacMan);
  eat(pacMan.position);
  setTimeout(drawScreen, 10);
  ghostMove(inky);
}
//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
// var stdin = process.stdin;
// stdin.setRawMode(true);
// stdin.resume();
// stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
// stdin.on('data', function(key) {
//   process.stdout.write(key);
//   processInput(key);
//   setTimeout(drawScreen, 10); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
// });

// Player Quits
// process.on('exit', function() {
//   console.log('\n\nGame Over!\n');
// });
