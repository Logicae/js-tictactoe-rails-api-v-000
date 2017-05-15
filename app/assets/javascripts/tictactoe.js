$(function() {
  attachListeners();
})

var turn = 0

const winningCombos = [ [0, 1, 2], [3, 4, 5],[6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]


//GAME FUNCTIONALITY

function attachListeners() {
  $('td').on('click', function(e) {
    e.preventDefault();
    doTurn(e)
  })
  $('#previous').on('click', function() { //if id previous is clicked, call getAllGames function
    getAllGames(); 
  })
}

function player() {
  return (turn % 2 === 0) ? "O" : "X"; //if no remainder then x
}

function doTurn(e) {
  turn += 1
  updateState(e)
  checkWinner()
}

var updateState = function(e) {
  $(e.currentTarget).html(player());
}

function checkWinner() {
  var currentPlayer = player()
  var board = getBoard();
  winningCombos.forEach(function(combo) { //iterates over Combos array
    if (board[combo[0]] == currentPlayer && board[combo[1]] == currentPlayer && board[combo[2]] == currentPlayer) {
      message("Player " + currentPlayer + " Won!"); //calls message() based on current player
      clearBoard();
    } else if (turn === 9) {
      clearBoard();
      message("Tie game")
    }
  })
  return false
}

function getBoard() {
  var board = [];
  $td = $("td");
  for (var i=0; i < 9; i++) {
    var cell = $td[i];
    board.push(cell.innerHTML);
    }
  return board;
}
//
// function boardFull(board) {
//   if (board.includes("")) {
//     return false
//   } else {
//     return true
//   }
// }
//

function clearBoard() {
  $("td").html("");
  turn = 0; //restarts games
}

function message(string) {
  $("div#message").text(string) //edited to replace text instead of append
}

// var winner = function() {
//   //this method can be used to check against checkWinner
// }
