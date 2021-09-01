import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BordOfGameComponent } from './bord-of-game/bord-of-game.component';

@NgModule({
  declarations: [
    AppComponent,
    BordOfGameComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
