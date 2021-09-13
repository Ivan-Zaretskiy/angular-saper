import {Component, OnInit,QueryList,ViewChildren, AfterViewInit } from '@angular/core';
import {BombPosition, gameStatus} from '../bomb-position/bomb-position';
import {BombComponent} from "../bomb/bomb.component";

@Component({
    selector: 'app-bord-of-game',
    templateUrl: './bord-of-game.component.html',
    styleUrls: ['./bord-of-game.component.css']
})
export class BordOfGameComponent implements OnInit, AfterViewInit   {
    @ViewChildren("cell") public cellList!: QueryList<BombPosition>;
    public arrayWithCell!:BombComponent[][];
    public title: string = 'Start New Game';
    public sizeGame: number = 16;
    public bombCount = 32;
    public gameStatus:gameStatus = gameStatus.Start

    constructor() {
    }

    ngOnInit(): void {
    }
    ngAfterViewInit() {
        console.log(this.cellList);
        this.allCellToArray();
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

    private allCellToArray():void{
        this.arrayWithCell = new Array<BombComponent[]>(this.sizeGame);
        for (let row: number = 0; row < this.sizeGame; ++row){
            // @ts-ignore
            this.arrayWithCell[row] = new Array<BombComponent>(this.sizeGame);
        }
        // @ts-ignore
        this.cellList.forEach(elem => (this.arrayWithCell[elem.positionBomb.row][elem.positionBomb.column] = elem));
        console.log(this.arrayWithCell);
    }
}
