$(function() {
  attachListeners();
})

var turn = 0
// const winningCombos = [ //these combos are for x, y coordinates in the readme - there may be a better way
//   [[0,0],[1,0],[2,0]], //this is the combo for the top row - 0, 0 = top left; 1, 0 = top center; 2, 0 = top right
//   [[0,1],[1,1],[2,1]],
//   [[0,2],[1,2],[2,2]],
//   [[0,0],[1,1],[2,2]],
//   [[0,0],[0,1],[0,2]],
//   [[2,0],[2,1],[2,2]],
//   [[1,0],[1,1],[1,2]],
//   [[2,0],[1,1],[0,2]]
//   ]

const winningCombos = [   [0, 1, 2], [3, 4, 5],[6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ]


//GAME FUNCTIONALITY

function attachListeners() {

  $('td').on('click', function(e) {
    e.preventDefault();
    doTurn(e)
  })
}

var player = function() {
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
  var board = getBoard();
  if (winner(board)) {
    message("Player " + player() + " Won!");
  } else if (boardFull(board) && !winner(board)) {
    message("Tie game")
  } else {
    return false
  }
}

function winner(board) {
  result = null;
  winningCombos.forEach(function(combo) {
    if ((board[combo[0]] === "X" && board[combo[1]] === "X" && board[combo[2]] === "X") || (board[combo[0]] === "O" && board[combo[1]] === "O" && board[combo[2]] === "O")) {
      result = true;
    }
  });
  return result
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

function boardFull(board) {
  if (board.includes("")) {
    return false
  } else {
    return true
  }
}

// function clearBoard() {
//   $("td").html("");
// }
//
function message(string) {
  $("div#message").append(string)
}
//
// var winner = function() {
//   //this method can be used to check against checkWinner
// }
