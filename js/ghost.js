// These functions are related to the decisions made by the ghosts about movements.

// Ghost AI:



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
  if (samePosition(pacMan, ghost)) {
    eatGhost(ghost);
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
  return choices;
}
