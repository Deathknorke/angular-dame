import { Component } from '@angular/core';
import { GameLogicService } from './game-logic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dame';

  constructor(public gameService:GameLogicService){}
}
