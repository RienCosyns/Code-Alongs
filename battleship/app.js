var shipData = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, "S", "S", "S", null, null, null, "D", null, null],
  [null, null, null, null, null, null, null, "D", null, null],
  [null, null, null, null, null, null, null, "D", null, null],
  [null, null, "C", "C", "C", "C", "C", null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, "B", null],
  [null, null, null, null, null, null, null, null, "B", null],
  [null, null, null, null, null, null, null, null, "B", null],
  [null, "P", "P", null, null, null, null, null, "B", null]
];

var gameState = [
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, null]
];

var schips = {
  C: {
    name: "Carrier",
    hits: 5
  },
  B: {
    name: "Battleship",
    hits: 3
  },
  S: {
    name: "Submarine",
    hits: 3
  },
  D: {
    name: "Destroyer",
    hits: 4
  },
  P: {
    name: "Patrol Boat",
    hits: 2
  }
};

/* Carrier     - 5 hits
      Battleship  - 4 hits
      Destroyer   - 3 hits
      Submarine   - 3 hits
      Patrol Boat - 2 hits
*/

// if we hit, we want to add 5 points. If we miss, we deduct one.

function createGameBoard() {
  var gameBoard = document.getElementById("gameBoard");
  for (var i = 0; i < 10; i++) {
    var tableRow = document.createElement("tr");
    tableRow.setAttribute("row", i);
    for (var j = 0; j < 10; j++) {
      var tableData = document.createElement("td");
      tableData.setAttribute("col", j);
      tableData.setAttribute("onclick", "play(this)");
      tableData.innerHTML = shipData[i][j];
      tableRow.appendChild(tableData);
    }
    gameBoard.appendChild(tableRow);
  }
}

function populateGameBoard(gameState) {
  var gameBoard = document.getElementById("gameBoard");
  for (var k = 0; k < gameState.length; k++) {
    var row = gameBoard.children[k];
    console.log(row);
    for (var l = 0; l < gameState[k].length; l++) {
      var col = row.children[l];
      console.log(col);
      col.innerHTML = gameState[k][l];
    }
  }
}

function play(cell) {
  var col = cell.getAttribute("col");
  var row = cell.parentElement.getAttribute("row");
  var score = Number(document.getElementById("score").innerHTML);
  var totalHits = Number(document.getElementById("hits").innerHTML);

  if (gameState[row][col] == null) {
    if (shipData[row][col] !== null) {
      alert("Hit!");
      // schips[shipData[row][col]].hits--
      for (var key in schips) {
        if (key == shipData[row][col]) {
          schips[key].hits--;
          if (schips[key].hits === 0) {
            alert("You sunk my " + schips[key].name);
          }
        }
      }
      gameState[row][col] = "X";
      score += 5;
      totalHits -= 1;
    } else {
      alert("You hit water!");
      gameState[row][col] = "O";
      score -= 1;
    }
  } else {
    alert("You've already tried this one!");
  }
  document.getElementById("score").innerHTML = score;
  document.getElementById("hits").innerHTML = totalHits;
  populateGameBoard(gameState);
  hasGameEnded(totalHits);
}

function hasGameEnded(hits) {
  if (hits === 0) {
    alert("You won the game");
    var tds = document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
      tds[i].onclick = function() {
        alert("The game has finished!");
      };
    }
  }
}

window.onload = function() {
  createGameBoard();
};

var startButton = document.getElementById("startButton");
startButton.onclick = function() {
  // alert("I clicked the button");
  populateGameBoard(gameState);
};
