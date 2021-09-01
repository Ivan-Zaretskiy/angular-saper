import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BordOfGameComponent } from './bord-of-game/bord-of-game.component';
import { BombComponent } from './bomb/bomb.component';

@NgModule({
  declarations: [
    AppComponent,
    BordOfGameComponent,
    BombComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
