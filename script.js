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

  // const reportValue = function(row, col) {
  //   console.log(board[row][col].getValue());
  // }

  // const printBoard = function() {
  //   let printedBoard = board.map((row) => row.map((cell) => cell.getValue()));
  //   console.table(printedBoard);
  // }

  const checkForWin = function(player) {
    const playerToken = player.getToken();
    let playerWins = false;
    for (let i = 0; i < 3; i++) {
      if (checkColumnWin(i, playerToken) || 
            checkRowWin(i, playerToken)) {
        playerWins = true;
      }
    }
    if (checkDiagonalWin(playerToken)) {
      playerWins = true;
    }
    return playerWins;
  }
  
  const checkColumnWin = function(col, token) {
    let playerWin = false;
    if (((board[0][col]).getValue() == token) &&
        ((board[1][col]).getValue() == token) &&
        ((board[2][col]).getValue() == token)) {
          playerWin = true;
        }
    return playerWin;
  }

  const checkRowWin = function(row, token) {
    let playerWin = false;
    if (((board[row][0]).getValue() == token) &&
        ((board[row][1]).getValue() == token) &&
        ((board[row][2]).getValue() == token)) {
          playerWin = true;
        }
    return playerWin;
  }

  const checkDiagonalWin = function(token) {
    let playerWin = false;
    if ((board[1][1]).getValue() == token) {
      if (((board[0][0]).getValue() == token && 
              (board[2][2]).getValue() == token) ||
          ((board[2][0]).getValue() == token && 
              (board[0][2]).getValue() == token)) {
            playerWin = true;
          }
      
    }
    return playerWin;
  }

  return {getBoard, makeMove, checkForWin};
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
  const token = "O";
  const name = "Player O";

  const getToken = function() {
    return token;
  };

  const getName = function() {
    return name;
  }

  return {getToken, getName}
}

function PlayerX() {
  const token = "X";
  const name = "Player X";

  const getToken = function() {
    return token;
  };

  const getName = function() {
    return name;
  }

  return {getToken, getName};
}

function GameController() {
  const board = Gameboard();
  const playerO = PlayerO();
  const playerX = PlayerX();
  
  let activePlayer = Math.random() > 0.5 ? playerO : playerX;

  const getActivePlayer = () => activePlayer.getName();

  const swapActivePlayer = () => activePlayer = activePlayer === playerO ? playerX : playerO;

  const playTurn = (row, col) => {
    let winningPlayer = "no-one"; 
    board.makeMove(row, col, activePlayer);
    if (board.checkForWin(activePlayer)) {
      winningPlayer = activePlayer.getName();
    };
    swapActivePlayer();
    return winningPlayer;
  };

  // const printNewRound = function() {
  //   board.printBoard();
  // }

  return {playTurn, getActivePlayer, getBoard: board.getBoard};
}

function ScreenController() {
  let game= GameController();
  const status = document.querySelector(".playerStatus");
  const display = document.querySelector(".board");
  const newGame = document.querySelector(".newGameButton");

  const updateBoard = function() {
    display.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    status.textContent = `Your turn, ${activePlayer}! `;

    for (let row = 0; row < 3; row ++) {
      for (let col = 0; col < 3; col++) {
        const cellButton = document.createElement("button");
        cellButton.textContent = (board[row][col]).getValue();
        cellButton.dataset.row = row;
        cellButton.dataset.col = col;
        if (cellButton.textContent == "-") {
          cellButton.addEventListener('click', clickMakeMove);
        }
        display.appendChild(cellButton)
      }
    }
  }

  const clickMakeMove = function(event) {
    row = event.target.dataset.row;
    col = event.target.dataset.col;
    winner = game.playTurn(row, col);
    if (winner != "no-one") {
      updateBoard();
      status.textContent = `Victory to ${winner}!`;
      return;
    } else {
      updateBoard();
    }
  }

  newGame.addEventListener('click', function() {
    game = GameController();
    updateBoard();
  });

  updateBoard();
}




ScreenController();