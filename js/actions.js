// These functions contain actions other than moving. Mostly eating.

function eat(position) {
  var x = position[0];
  var y = position[1];
  for (var i = 0; i < ghosts.length; i++) {
    if (samePosition(ghosts[i], pacMan)) {
      eatGhost(ghosts[i]);
    }
  }
  switch (currentBoard[y][x]) {
    case '@':
      updateScore(40);
      eatPowerPellet();
    case 'o':
      updateScore(10);
      eatDot(position);
      break;
    case ' ':
      // Do Nothing
      break;
    default:
      eatFruit(position);
      break;
  }
}

function eatDot(position) {
  var x = position[0];
  var y = position[1];
  messageLog('Chomp!');
  currentBoard[y] = currentBoard[y].substring(0,x)
                  + ' '
                  + currentBoard[y].substring(x + 1, currentBoard[y].length);
  dotsLeft--;
  if ((dotsLeft === 0) && (powerPellets === 0 )) {
    levelUp();
  }
  for (var i = 0; i < fruitThresholds.length; i++) {
    if (dotsLeft === fruitThresholds[i]) {
      addFruit();
    }
  }
}

function eatPowerPellet() {
  for(var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
    ghosts[i].direction = reverse(ghosts[i].direction);
    ghosts[i].delay
  }
  powerPellets--;
  dotsLeft++; // fix for counting error.
  setTimeout(function() {
    // Make ghosts inedible after a while
    for (i = 0; i < ghosts.length; i++) {
      ghosts[i].edible = false;
    }
    ghostsEaten = 0;
  }, edibleTimeout);
}

function eatGhost(ghost) {
  if (ghost.edible) {
    ghost.edible = false;
    updateScore(Math.pow(2,ghostsEaten) * 100);
    ghostsEaten++;
    ghost.position = ghost.home;
    console.log('\nCHOMP!\nYou ate ' + ghost.name + ' (the ' + ghost.character + ' ghost).');
    ghostsEaten++;
  } else {
    console.log('\nCHOMP!\n' + ghost.name + ' (the ' + ghost.colour + ' one) ate YOU!')
    killPacMan();
  }
}

function eatFruit(position) {
  var x = position[0];
  var y = position[1];
  for (var i = 0; i < bonuses.length; i++) {
    if (bonuses[i].sprite[1] === currentBoard[y][x]) {
      pacMan.score += bonuses[i].points;
      fruitEaten += bonuses[i].sprite;
      fruitEaten += ' ';
    }
    setTimeout(function() { document.querySelector('#bonuses').innerText = fruitEaten; }, 10);
  }
  currentBoard[y] = insertCharacter(currentBoard[y], none);
}

function killPacMan() {
  pacMan.lives--;
  pacMan.position = pacMan.home;
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].position = ghosts[i].home;
    ghosts[i].edible = false;
  }
  ghostsEaten = 0; // Reset ghost eating bonuses
  if (pacMan.lives < 0) {
    //process.exit();
  }
}

function levelUp() {
  currentBoard = level1Board;
  level++;
  pacMan.position = pacMan.home;
  for (i = 1; i < ghosts.length; i++) {
    ghosts[i].position = ghosts[i].home;
    ghosts[i].edible = false;
  }
  inky.position = [26, 11];
  inky.edible = false;
  inky.direction = 'Left';
}

function addFruit() {
  var fruit;
  if (level >= 13) {
    fruit = key;
  } else {
    fruit = bonuses[level];
  }
  var line_num = fruit.position[1];
  currentBoard[line_num] = insertCharacter(currentBoard[line_num], fruit);
}
