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
}

function Cell() {
  let value = 0


}

function PlayerO() {

}

function PlayerX() {

}

function GameController() {

}