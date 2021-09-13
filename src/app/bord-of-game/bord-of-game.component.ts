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
    public bombCount = 32;
    public gameStatus:gameStatus = gameStatus.Start
    // @ViewChildren("bomb") public BombList: QueryList<BombComponent>;

    constructor() {
    }
    public ngAfterViewInit(): void {

    }
    ngOnInit(): void {
    }

    leftClickElem(bombPos: BombPosition) {
        if (this.gameStatus == gameStatus.Start){
            let bombs : BombPosition[] = this.randomBombForStart(bombPos);
            console.log(bombs);
        }
    }

    rightClickElem($event: BombPosition) {
        console.log('right');
    }

    randomBombForStart(bombPos: BombPosition) : BombPosition[]{
        const bombs: BombPosition[] = [];
        while (bombs.length < this.bombCount){
            let bombElem: BombPosition;
            do {
                bombElem = new BombPosition(
                    Math.floor(Math.random() * this.sizeGame),
                    Math.floor(Math.random() * this.sizeGame)
                );
            } while(bombs.findIndex(bomb => bomb.existIn(bombElem)) >= 0)
            bombs.push(bombElem);
        }
        return bombs;
    }
}
