// Draw the screen functionality
function drawScreen() {
  setTimeout(function() {
    displayBoard();
  }, 10);
}

function messageLog(content) {
  setTimeout(function() {
    var thisMessageNum = ++messageNum;
    var tag =  document.querySelector('#message-box');
    tag.innerText = content;
    setTimeout(function() {
      if (messageNum === thisMessageNum) {
        tag.innerText = '';
      }
    }, 500);
  }, 10);
}

function displayBoard() {
  var content = "";
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
    content += line;
    content += '\n';
  }
  document.querySelector('#game').innerText = content;
}


function insertCharacter(line, character) {
  var insert = character.sprite;
  if (character.edible) {
    insert = character.edibleSprite;
  }
  return line.substring(0, character.position[0] - 1)
       + insert
       + line.substring(character.position[0] + 2, line.length);
}

function updateScore(amount) {
  pacMan.score += amount;
  document.querySelector('#score').innerText = 'Points: ' + pacMan.score;
}
