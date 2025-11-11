# General Structure

Gameboard
  getBoard
  makeMove
  printBoard

Cell
  setValue
  getValue
  isEmpty

PlayerO, PlayerX
  getToken

GameController

# fast game

game = GameController();
game.playTurn(1, 1);
game.playTurn(0, 0);
game.playTurn(2, 2);
game.playTurn(1, 0);
game.playTurn(2, 0);
game.playTurn(0, 1);
game.playTurn(0, 2);

# horizontal game
game = GameController();
game.playTurn(0, 0);
game.playTurn(1, 0);
game.playTurn(0, 1);
game.playTurn(1, 1);
game.playTurn(0, 2);