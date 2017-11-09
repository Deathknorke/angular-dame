import { Component, OnInit, Input } from '@angular/core';
import { Color, GameLogicService } from '../game-logic.service';

@Component({
  selector: 'app-win-screen',
  templateUrl: './win-screen.component.html',
  styleUrls: ['./win-screen.component.css']
})
export class WinScreenComponent implements OnInit {

  @Input() player: Color;

  constructor(private gameService: GameLogicService) { }

  ngOnInit() {
  }

  restartGame() {
    this.gameService.resetPlayground();
  }

}
