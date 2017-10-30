import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatAppModuleModule } from './mat-app-module/mat-app-module.module';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { FigureComponent } from './figure/figure.component';

import { GameLogicService } from './game-logic.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    FigureComponent
  ],
  imports: [
    BrowserModule,
    MatAppModuleModule
  ],
  providers: [GameLogicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
