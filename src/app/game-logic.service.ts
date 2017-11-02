import { Injectable, OnInit } from '@angular/core';


export class Figure {
  public Dame = false;
  public Moves: Move[];
  constructor(public color: Color) { }
}

export class Move {
  constructor(public yCord: number, public xCord: number) { }
}

export enum Color {
  BLACK,
  WHITE
}

@Injectable()
export class GameLogicService {

  private _board: Figure[][];

  private _currenPlayer: Color = Color.BLACK;
  private _playgroundSize = 8;

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

  calculateBoard() {
    const board = this._board;
    for (var i = 0; i < board.length; i++) {
      var row = board[i];

      for (var j = 0; j < row.length; j++) {
        var cell = row[j];

        if (cell && cell.color === this._currenPlayer) {
          cell.Moves = this.getMoves(i, j);
        }

      }
    }

    this._board = board;
  }

  getMoves(yCord: number, xCord: number): Move[] {
    const possibleMoves = [];
    let cell;
    debugger;
    if ((yCord + 1) < this._board.length && (xCord - 1) >= 0) {
      cell = this._board[yCord + 1][xCord - 1];
      if (cell == null) {
        possibleMoves.push(new Move(yCord + 1, xCord - 1))
      } else {
        //Todo check for punch
      }
    }
    if ((yCord + 1) < this._board.length && (xCord + 1) < this._board.length) {
      cell = this._board[yCord + 1][xCord + 1];
      if (cell == null) {
        possibleMoves.push(new Move(yCord + 1, xCord + 1))
      } else {
        //Todo check for punch
      }
    }
    if ((yCord - 1) >= 0 && (xCord - 1) >= 0) {
      cell = this._board[yCord - 1][xCord - 1];
      if (cell == null) {
        possibleMoves.push(new Move(yCord - 1, xCord - 1))
      } else {
        //Todo check for punch
      }
    }
    if ((yCord - 1) >= 0 && (xCord + 1) < this._board.length) {
      cell = this._board[yCord - 1][xCord + 1];
      if (cell == null) {
        possibleMoves.push(new Move(yCord - 1, xCord + 1))
      } else {
        //Todo check for punch
      }
    }

    return possibleMoves;
  }


  getCurrentBoard() {
    this.calculateBoard();
    return this._board;
  }
}


