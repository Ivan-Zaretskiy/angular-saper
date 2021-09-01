import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bord-of-game',
  templateUrl: './bord-of-game.component.html',
  styleUrls: ['./bord-of-game.component.css']
})
export class BordOfGameComponent implements OnInit {
  public title: string = 'board';
  constructor() { }

  ngOnInit(): void {
  }

}
