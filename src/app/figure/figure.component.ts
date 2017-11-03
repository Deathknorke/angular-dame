import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Move } from '../game-logic.service';

import {Figure} from '../game-logic.service';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.css']
})
export class FigureComponent implements OnInit {

  @Input() figure: Figure;
  @Input() moves:Move[];
  @Output() onSelect = new EventEmitter<Move[]>()
  constructor() {}

  ngOnInit() {
  }

  selected(){
    this.onSelect.emit(this.moves);
  }

}
