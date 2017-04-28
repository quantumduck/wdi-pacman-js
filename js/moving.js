// These functions mainly find the position of characters and move them around.

function samePosition(character1, character2) {
  var c1x = character1.position[0];
  var c2x = character2.position[0];
  var c1y = character1.position[1];
  var c2y = character2.position[1];
  return (c1x === c2x) && (c1y === c2y);
}

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
