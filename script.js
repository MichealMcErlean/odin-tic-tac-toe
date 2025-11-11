function Gameboard() {
  
  const rows = 3;
  const columns = 3;
  let board = []

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const makeMove = function(row, col, player) {
    if (board[row][col].isEmpty()) {
      board[row][col].setValue(player.getToken());
      return true;
    } else {
      return false;
    }
  }

  const reportValue = function(row, col) {
    console.log(board[row][col].getValue());
  }

  const printBoard = function() {
    let printedBoard = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(printedBoard);
    console.log(reportValue(1, 1));
  }

  

  return {getBoard, makeMove, printBoard, reportValue};
}

function Cell() {
  let value = "-";

  const setValue = function(token) {
    if (value == "-") {
      value = token;
    } 
  }

  const getValue = function() {
    return value;
  }

  const isEmpty = function() {
    return (value == "-");
  }

  return {getValue, setValue, isEmpty};
}

function PlayerO() {
  let token = "O";

  const getToken = function() {
    return token;
  };

  return {getToken}
}

function PlayerX() {
  let token = "X";

  const getToken = function() {
    return token;
  };

  return {getToken};
}

function GameController() {
  const board = Gameboard();
  const playerO = PlayerO();
  const playerX = PlayerX();
  
  let activePlayer = Math.random() > 0.5 ? playerO : playerX;

  const getActivePlayer = () => activePlayer;

  const swapActivePlayer = () => activePlayer = activePlayer === playerO ? playerX : playerO;

  const playTurn = (row, col) => {
    board.makeMove(row, col, activePlayer);

    swapActivePlayer();
    printNewRound();
  };

  const printNewRound = function() {
    board.printBoard();
  }

  return {printNewRound, playTurn};
}