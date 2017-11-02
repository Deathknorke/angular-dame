import { Component, OnInit, Input } from '@angular/core';

import {Figure} from '../game-logic.service';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.css']
})
export class FigureComponent implements OnInit {

  @Input() figure: Figure;

  constructor() {
    
   }

  ngOnInit() {
  }

}
