import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Move } from '../game-logic.service';

import { Figure, Color } from '../game-logic.service';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.css']
})
export class FigureComponent implements OnInit {

  @Input() figure: Figure;
  @Input() moves: Move[];
  @Output() onSelect = new EventEmitter<Move[]>()
  constructor() { }

  ngOnInit() {
  }

  getFigureIcon() {
    switch (this.figure.color) {
      case Color.BLACK:
        if (this.figure.Dame) {
          return "adjust"
        } else {
          return "brightness_1"
        }
      case Color.WHITE:
        if (this.figure.Dame) {
          return "adjust"
        } else {
          return "brightness_1";
        }
    }
  }

  selected() {
    this.onSelect.emit(this.moves);
  }

}
