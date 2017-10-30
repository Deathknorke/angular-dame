import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatGridListModule} from '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatGridListModule
  ],
  declarations: []
})
export class MatAppModuleModule { }
