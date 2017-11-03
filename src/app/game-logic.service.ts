import { Injectable, OnInit } from '@angular/core';


export class Figure {
  public Dame = false;
  constructor(public color: Color) { }
}

export class Move {
  public Punch = false;
  constructor(public yCord: number, public xCord: number, public yCordFrom: number, public xCordFrom: number) { }
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

  private _currenPlayer: Color = Color.WHITE;
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

  getMoves(yCord: number, xCord: number): Move[] {
    if (this._board[yCord][xCord].color != this._currenPlayer) {
      return [];
    }
    const possibleMoves = [];

    let move = this.checkMove(yCord,xCord,Direction.BOTTOM,Direction.LEFT);
    if(move){
      possibleMoves.push(move);
    }
    move = this.checkMove(yCord,xCord,Direction.BOTTOM,Direction.RIGHT);
    if(move){
      possibleMoves.push(move);
    }
    move = this.checkMove(yCord,xCord,Direction.TOP,Direction.LEFT);
    if(move){
      possibleMoves.push(move);
    }
    move = this.checkMove(yCord,xCord,Direction.TOP,Direction.RIGHT);
    if(move){
      possibleMoves.push(move);
    }

    return possibleMoves;
  }

  checkMove(yCord: number, xCord: number, yDir: Direction,xDir:Direction):Move {

    const yTo = this.getDirection(yDir, yCord);
    const xTo = this.getDirection(xDir, xCord);
    if ((yTo) < this._board.length && (xTo) < this._board.length) {
      const cell = this._board[yCord + 1][xCord + 1];
      if (cell == null) {
        return new Move(yTo, xTo, yCord, xCord);
      } else {
        //Todo check for punch
      }
    }
  }

  getDirection(dir: Direction, Cord: number):number {
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
    return;
  }

  doMove(move: Move) {
    this._board[move.yCord][move.xCord] = this._board[move.yCordFrom][move.xCordFrom];
    this._board[move.yCordFrom][move.xCordFrom] = null;

    switch (this._currenPlayer) {
      case Color.BLACK:
        this._currenPlayer = Color.WHITE
        break;
      case Color.WHITE:
        this._currenPlayer = Color.BLACK
        break;
    }
  }


  getCurrentBoard() {
    return this._board;
  }
}


