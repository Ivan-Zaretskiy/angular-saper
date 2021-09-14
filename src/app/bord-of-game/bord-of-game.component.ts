import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BombPosition, gameStatus} from '../bomb-position/bomb-position';
import {BombComponent, cellDisplay} from "../bomb/bomb.component";

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
    public bombCount: number = 32;
    public bombLeft: number = this.bombCount;
    public gameStatus:gameStatus = gameStatus.Start

    constructor() {
    }

    ngOnInit(): void {
    }
    ngAfterViewInit() {
        this.allCellToArray();
    }

    leftClickElem(bombPos: BombPosition) {
        if (this.gameStatus !== gameStatus.End) {
            if (this.gameStatus == gameStatus.Start) {
                this.gameStatus = gameStatus.In_Progress;
                let bombs: BombPosition[] = this.randomBombForStart(bombPos);
                this.bombNearCells(bombs);
            }
            const cell = this.arrayWithCell[bombPos.row][bombPos.column];
            if (cell.cellDisplay == cellDisplay.Flag){
                this.bombLeft++;
            }
            if (cell.isBomb()) {
                cell.cellDisplay = cellDisplay.Bomb
            } else {
                cell.cellDisplay = cellDisplay.Visible;
            }
        }
    }

    rightClickElem(position: BombPosition) :void{
        if (this.gameStatus  == gameStatus.In_Progress){
            const cell = this.arrayWithCell[position.row][position.column];
            if (cell.cellDisplay == cellDisplay.None && this.bombLeft > 0){
                this.bombLeft--;
                cell.cellDisplay = cellDisplay.Flag;
            } else if (cell.cellDisplay == cellDisplay.Flag){
                this.bombLeft++;
                cell.cellDisplay = cellDisplay.None;
            }
        }
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
        for (let row: number = 0; row < this.sizeGame; row++){
            // @ts-ignore
            this.arrayWithCell[row] = new Array<BombComponent>(this.sizeGame);
        }
        // @ts-ignore
        this.cellList.forEach(elem => (this.arrayWithCell[elem.positionBomb.row][elem.positionBomb.column] = elem));
    }

    private bombNearCells(bombs: BombPosition[]) {
        bombs.forEach(cell => this.arrayWithCell[cell.row][cell.column].createBomb())
        bombs.forEach(cell =>{

        })
    }

}
