import {AfterViewInit, Component, OnInit,QueryList,ViewChildren} from '@angular/core';
import {BombPosition, gameStatus} from '../bomb-position/bomb-position';

@Component({
    selector: 'app-bord-of-game',
    templateUrl: './bord-of-game.component.html',
    styleUrls: ['./bord-of-game.component.css']
})
export class BordOfGameComponent implements OnInit,AfterViewInit {
    public title: string = 'board';
    public sizeGame: number = 16;
    public gameStatus:gameStatus = gameStatus.Start
    // @ViewChildren("bomb") public BombList: QueryList<BombComponent>;

    constructor() {
    }
    public ngAfterViewInit(): void {

    }
    ngOnInit(): void {
    }

    leftClickElem($event: BombPosition) {
        console.log($event);
    }

    rightClickElem($event: BombPosition) {
        console.log($event);
    }
}
