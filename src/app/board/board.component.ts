import { Component, OnInit } from '@angular/core';

import { Figure, GameLogicService, Move } from '../game-logic.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  board: Figure[][];
  public displayedMoves : Move[];
  constructor(private game: GameLogicService) { }

  ngOnInit() {
    this.board = this.game.getCurrentBoard();
  }

  isActive(yCord:number, xCord:number){
    return this.displayedMoves && this.getMove(yCord,xCord);
  }
  getMove(yCord:number, xCord:number):Move{
    return this.displayedMoves.find(move => move.xCord == xCord && move.yCord == yCord);
  }

  doMove(yCord:number,xCord:number){
    const move = this.getMove(yCord,xCord);
    this.game.doMove(move);
    this.displayedMoves = [];
  }

  getMoves(yCord:number,xCord:number){
   return this.game.getMoves(yCord,xCord);
  }

}
