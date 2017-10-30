import { Injectable, OnInit } from '@angular/core';


export class Figure {
  public Dame = false;

  constructor(public color: Color) { }
}

export enum Color {
  BLACK,
  WHITE
}

@Injectable()
export class GameLogicService {

  private _board: Figure[][];

  constructor() {
    this.onInit();
  }

  onInit() {
    this._board = this.generateBoard(8);
  }

  private generateBoard(size: number): Figure[][] {
    const board = [];
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        if (i < (size / 2 - 1) || i > (size / 2 )) {
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
        }else {
          board[i][j] = null;
        }
      }
    }
    return board;
  }

  getCurrentBoard() {
    return this._board;
  }
}


