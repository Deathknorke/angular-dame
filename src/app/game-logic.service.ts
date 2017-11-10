import { Injectable, OnInit } from '@angular/core';


export class Figure {
  public Dame = false;
  constructor(public color: Color) { }
}

export class Move {
  constructor(public yCordDest: number, public xCordDest: number, public yCordSource: number, public xCordSource: number) { }
}
export class Punch implements Move {
  constructor(public yCordDest: number, public xCordDest: number, public yCordSource: number, public xCordSource: number,
    public yCordPunch: number, public xCordPunch: number) { }

}

export enum Color {
  BLACK,
  WHITE
}

enum Direction {
  RIGHT,
  LEFT,
  TOP,
  BOTTOM
}

@Injectable()
export class GameLogicService {

  private _board: Figure[][];
  private _moves: Move[] = [];
  private _punches: Move[] = [];
  private _currenPlayer: Color = Color.WHITE;
  private _playgroundSize = 8;

  public _winPlayer: Color;

  constructor() {
    this.onInit();
  }

  onInit() {
    this._board = this.generateStartBoard();
  }

  private generateStartBoard(): Figure[][] {
    const size = this._playgroundSize;
    const board = [];
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        if (i < (size / 2 - 1) || i > (size / 2)) {
          if (i % 2 === 0) {
            if (j % 2 !== 0) {
              board[i][j] = new Figure(i < size / 2 ? Color.BLACK : Color.WHITE);
            } else {
              board[i][j] = null;
            }
          } else {
            if (j % 2 === 0) {
              board[i][j] = new Figure(i < size / 2 ? Color.BLACK : Color.WHITE);
            } else {
              board[i][j] = null;
            }
          }
        } else {
          board[i][j] = null;
        }
      }
    }
    return board;
  }

  getMoves(yCord: number, xCord: number): Move[] {

    if (this._board[yCord][xCord].color != this._currenPlayer) {
      return [];
    }

    if (this._punches.length == 0 || this._moves.length == 0) {
      this.calculateAllMoves();
    }

    if (this._punches.length > 0) {
      return this._punches.filter(move => move.xCordSource == xCord && move.yCordSource == yCord);
    } else {
      return this._moves.filter(move => move.xCordSource == xCord && move.yCordSource == yCord);
    }
  }

  calculateAllMoves() {
    this._moves = [];
    this._punches = [];
    for (var i = 0; i < this._board.length; i++) {
      for (var j = 0; j < this._board[i].length; j++) {
        if (this._board[i][j] != null && this._board[i][j].color == this._currenPlayer) {

          this.checkAllMoves(i, j);
          this.checkAllPunches(i, j);
        }
      }
    }
  }

  checkAllMoves(yCord: number, xCord: number) {

    this.checkMove(yCord, xCord, Direction.BOTTOM, Direction.LEFT);
    this.checkMove(yCord, xCord, Direction.BOTTOM, Direction.RIGHT);
    this.checkMove(yCord, xCord, Direction.TOP, Direction.LEFT);
    this.checkMove(yCord, xCord, Direction.TOP, Direction.RIGHT);
  }

  checkAllPunches(yCord: number, xCord: number) {

    this.checkPunch(yCord, xCord, Direction.BOTTOM, Direction.LEFT);
    this.checkPunch(yCord, xCord, Direction.BOTTOM, Direction.RIGHT);
    this.checkPunch(yCord, xCord, Direction.TOP, Direction.LEFT);
    this.checkPunch(yCord, xCord, Direction.TOP, Direction.RIGHT);
  }

  checkMove(yCordSource: number, xCordSource: number, yDir: Direction, xDir: Direction) {
    let yCordDest = this.getDirection(yDir, yCordSource);
    let xCordDest = this.getDirection(xDir, xCordSource);
    if (yCordDest < this._board.length && xCordDest < this._board.length && yCordDest >= 0 && xCordDest >= 0) {
      let cell = this._board[yCordDest][xCordDest];
      if (cell == null && (yDir == this.getAllowedMoveDirection() || this._board[yCordSource][xCordSource].Dame)) {

        if (this._board[yCordSource][xCordSource].Dame) {
          while (cell == null && yCordDest < this._board.length && xCordDest < this._board.length && yCordDest >= 0 && xCordDest >= 0) {

            this._moves.push(new Move(yCordDest, xCordDest, yCordSource, xCordSource));
            yCordDest = this.getDirection(yDir, yCordDest);
            xCordDest = this.getDirection(xDir, xCordDest);
            if (yCordDest < this._board.length && xCordDest < this._board.length && yCordDest >= 0 && xCordDest >= 0) {
              cell = this._board[yCordDest][xCordDest];
            }
          }
        } else {
          this._moves.push(new Move(yCordDest, xCordDest, yCordSource, xCordSource));
        }
      }
    }
  }

  checkPunch(yCord: number, xCord: number, yDir: Direction, xDir: Direction) {
    let yCordEnemy = this.getDirection(yDir, yCord);
    let xCordEnemy = this.getDirection(xDir, xCord);
    if (yCordEnemy < this._board.length && xCordEnemy < this._board.length && yCordEnemy >= 0 && xCordEnemy >= 0) {

      let cell = this._board[yCordEnemy][xCordEnemy];
      if (this._board[yCord][xCord].Dame)
        while (cell == null && yCordEnemy < this._board.length && xCordEnemy < this._board.length && yCordEnemy >= 0 && xCordEnemy >= 0) {

          yCordEnemy = this.getDirection(yDir, yCordEnemy);
          xCordEnemy = this.getDirection(xDir, xCordEnemy);
          if (yCordEnemy < this._board.length && xCordEnemy < this._board.length && yCordEnemy >= 0 && xCordEnemy >= 0) {

            cell = this._board[yCordEnemy][xCordEnemy];
          }
        }
      if (cell != null && cell.color != this._currenPlayer) {

        const yCordDest = this.getDirection(yDir, yCordEnemy);
        const xCordDest = this.getDirection(xDir, xCordEnemy);
        if (yCordDest < this._board.length && xCordDest < this._board.length && yCordDest >= 0 && xCordDest >= 0) {
          if (this._board[yCordDest][xCordDest] == null) {

            this._punches.push(new Punch(yCordDest, xCordDest, yCord, xCord, yCordEnemy, xCordEnemy));
          }
        }
      }
    }
  }

  getAllowedMoveDirection(): Direction {
    switch (this._currenPlayer) {
      case Color.BLACK:
        return Direction.BOTTOM;
      case Color.WHITE:
        return Direction.TOP;
    }
  }

  getDirection(dir: Direction, Cord: number): number {
    let newCord;
    switch (dir) {
      case Direction.TOP:
        newCord = Cord - 1;
        break;
      case Direction.BOTTOM:
        newCord = Cord + 1;
        break;
      case Direction.RIGHT:
        newCord = Cord + 1;
        break;
      case Direction.LEFT:
        newCord = Cord - 1;
        break;
    }
    return newCord;
  }

  doMove(move: Move) {
    let canChangePlayer = true;
    this._board[move.yCordDest][move.xCordDest] = this._board[move.yCordSource][move.xCordSource];
    this._board[move.yCordSource][move.xCordSource] = null;

    if (move instanceof Punch) {
      this._board[move.yCordPunch][move.xCordPunch] = null;
      this._punches = [];
      this._moves = [];
      this.checkAllPunches(move.yCordDest, move.xCordDest);
      if (this._punches.length > 0) {
        canChangePlayer = false;
      }
    }

    this.checkForQueen(move);
    this.checkWin();
    if (canChangePlayer) {
      this.doChangePlayer();
    }
  }

  doChangePlayer() {
    switch (this._currenPlayer) {
      case Color.BLACK:
        this._currenPlayer = Color.WHITE
        break;
      case Color.WHITE:
        this._currenPlayer = Color.BLACK
        break;
    }

    this._punches = [];
    this._moves = [];
  }

  resetPlayground() {
    this._winPlayer = undefined;
    this._punches = [];
    this._moves = [];
   this._board = this.generateStartBoard();
  }

  checkForQueen(move: Move) {
    let enemyLine = -1;

    switch (this.getAllowedMoveDirection()) {
      case Direction.BOTTOM:
        enemyLine = this._board.length - 1;
        break;
      case Direction.TOP:
        enemyLine = 0;
        break;
    }
    if (move.yCordDest == enemyLine) {
      this._board[move.yCordDest][move.xCordDest].Dame = true;
    }
  }

  checkWin() {
    let white = 0;
    let black = 0;

    for (var i = 0; i < this._board.length; i++) {
      for (var j = 0; j < this._board[i].length; j++) {
        const cell = this._board[i][j];
        if (cell != null) {
          if (cell.color == Color.BLACK) {
            black += 1;
          } else {
            white += 1;
          }
        }
      }
    }
    if (white == 0) {
      this._winPlayer = Color.BLACK;
    } else if (black == 0) {
      this._winPlayer = Color.WHITE;
    }

  }

  getCurrentBoard() {
    return this._board;
  }
}


