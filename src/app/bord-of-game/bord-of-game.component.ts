import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {BombPosition, gameStatus} from '../bomb-position/bomb-position';
import {BombComponent, cellDisplay} from "../bomb/bomb.component";

@Component({
    selector: 'app-bord-of-game',
    templateUrl: './bord-of-game.component.html',
    styleUrls: ['./bord-of-game.component.css']
})
export class BordOfGameComponent implements OnInit, AfterViewInit {
    @ViewChildren("cell") public cellList!: QueryList<BombPosition>;
    public arrayWithCell!: BombComponent[][];
    public title: string = 'Click To Start';
    public sizeGame: number = 16;
    public bombCount: number = Math.ceil(Math.pow(this.sizeGame,2) / 6.4);
    public bombLeftFlag: number = this.bombCount;
    public leftToWin: number = this.bombCount;
    public gameStatus: gameStatus = gameStatus.Start;
    public backgroundStatusEnum: typeof backgroundStatus = backgroundStatus;
    public gameBg : backgroundStatus = backgroundStatus.Normal;
    public sec : number = 0
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
                this.title = 'Good Luck ^_^';
                let bombs: BombPosition[] = this.randomBombForStart(bombPos);
                this.bombNearCells(bombs);
            }
            const cell = this.arrayWithCell[bombPos.row][bombPos.column];
            if (cell.cellDisplay == cellDisplay.Flag) {
                this.bombLeftFlag++;
            }
            if (cell.isBomb()) {
                cell.cellDisplay = cellDisplay.Bomb
                this.endGame(false);
            } else {
                cell.cellDisplay = cellDisplay.Visible;
                if (cell.isEmptyCell()){
                    this.openAllEmptyCell(bombPos);
                }
            }
        }
    }

    rightClickElem(position: BombPosition): void {
        if (this.gameStatus == gameStatus.In_Progress) {
            const cell = this.arrayWithCell[position.row][position.column];
            if (cell.cellDisplay == cellDisplay.None && this.bombLeftFlag > 0) {
                this.bombLeftFlag--;
                if (cell.isBomb()) {
                    this.leftToWin--;
                    if (this.leftToWin == 0) {
                        this.endGame(true);
                    }
                }
                cell.cellDisplay = cellDisplay.Flag;
            } else if (cell.cellDisplay == cellDisplay.Flag) {
                if (cell.isBomb()) {
                    this.leftToWin++;
                }
                this.bombLeftFlag++;
                cell.cellDisplay = cellDisplay.None;
            }
            console.log(this.leftToWin);
        }
    }

    randomBombForStart(bombPos: BombPosition): BombPosition[] {
        const bombs: BombPosition[] = [];
        while (bombs.length < this.bombCount) {
            let bombElem: BombPosition;
            do {
                bombElem = new BombPosition(
                    Math.floor(Math.random() * this.sizeGame),
                    Math.floor(Math.random() * this.sizeGame)
                );
            } while (bombs.findIndex(bomb => bomb.existIn(bombElem)) >= 0 || bombPos.checkForEmptyRowNearCell(bombElem))
            bombs.push(bombElem);
        }
        return bombs;
    }

    private allCellToArray(): void {
        this.arrayWithCell = new Array<BombComponent[]>(this.sizeGame);
        for (let row: number = 0; row < this.sizeGame; row++) {
            this.arrayWithCell[row] = new Array<BombComponent>(this.sizeGame);
        }
        // @ts-ignore
        this.cellList.forEach(elem => (this.arrayWithCell[elem.positionBomb.row][elem.positionBomb.column] = elem));
    }

    private bombNearCells(bombs: BombPosition[]) {
        bombs.forEach(cell => this.arrayWithCell[cell.row][cell.column].createBomb())
        const n: number = this.sizeGame - 1;
        bombs.forEach(cell => {
            let row = cell.row;
            let col = cell.column;
            if (row > 0 && col > 0) {
                this.arrayWithCell[cell.row - 1][cell.column - 1].addNearBombCount();
            }
            if (row > 0) {
                this.arrayWithCell[cell.row - 1][cell.column].addNearBombCount();
            }
            if (row > 0 && col < n) {
                this.arrayWithCell[cell.row - 1][cell.column + 1].addNearBombCount();
            }
            if (col > 0) {
                this.arrayWithCell[cell.row][cell.column - 1].addNearBombCount();
            }
            if (col < n) {
                this.arrayWithCell[cell.row][cell.column + 1].addNearBombCount();
            }
            if (row < n && col > 0) {
                this.arrayWithCell[cell.row + 1][cell.column - 1].addNearBombCount();
            }
            if (row < n) {
                this.arrayWithCell[cell.row + 1][cell.column].addNearBombCount();
            }
            if (row < n && col < n) {
                this.arrayWithCell[cell.row + 1][cell.column + 1].addNearBombCount();
            }
        })
    }

    public startGame() {
        if (this.gameStatus !== gameStatus.Start) {
            this.gameBg = backgroundStatus.Normal;
            this.gameStatus = gameStatus.Start;
            this.leftToWin = this.bombCount;
            this.bombLeftFlag = this.bombCount;
            this.title = 'Click To Start';
            this.arrayWithCell.forEach(row => row.forEach(cell => cell.resetParam()));
        }
    }

    private endGame(success: boolean): void {
        this.gameStatus = gameStatus.End;
        if (success) {
            this.gameBg = backgroundStatus.Stars;
            this.title = 'You Won! Try Again?'
        } else {
            this.gameBg = backgroundStatus.Blood;
            this.title = 'Oops... Try Again!'
            this.arrayWithCell.forEach(row =>
                row.forEach(cell => {
                    if (cell.isBomb()) {
                        cell.cellDisplay = cellDisplay.Bomb;
                    }
                })
            );
        }
    }

    private openAllEmptyCell(clickPos: BombPosition) {
        const cellsToOpen: BombPosition[] = [clickPos];
        const n = this.sizeGame - 1;
        while (cellsToOpen.length > 0){
            let cell = cellsToOpen.shift();
            if (cell !== undefined){
                let row = cell.row;
                let col = cell.column;
                if (this.arrayWithCell[row][col].isEmptyCell()){
                    if (row > 0 && col > 0) {
                        if (!this.arrayWithCell[row - 1][col - 1].isBomb() && this.arrayWithCell[row - 1][col - 1].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row - 1][col - 1].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row - 1,col - 1));
                        }
                    }
                    if (row > 0) {
                        if (!this.arrayWithCell[row - 1][col].isBomb() && this.arrayWithCell[row - 1][col].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row - 1][col].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row - 1,col));
                        }
                    }
                    if (row > 0 && col < n) {
                        if (!this.arrayWithCell[row - 1][col + 1].isBomb() && this.arrayWithCell[row - 1][col + 1].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row - 1][col + 1].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row - 1,col + 1));
                        }
                    }
                    if (col > 0) {
                        if (!this.arrayWithCell[row][col - 1].isBomb() && this.arrayWithCell[row][col - 1].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row][col - 1].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row,col - 1));
                        }
                    }
                    if (col < n) {
                        if (!this.arrayWithCell[row][col + 1].isBomb() && this.arrayWithCell[row][col + 1].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row][col + 1].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row,col + 1));
                        }
                    }
                    if (row < n && col > 0) {
                        if (!this.arrayWithCell[row + 1][col - 1].isBomb() && this.arrayWithCell[row + 1][col - 1].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row + 1][col - 1].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row + 1,col - 1));
                        }
                    }
                    if (row < n) {
                        if (!this.arrayWithCell[row + 1][col].isBomb() && this.arrayWithCell[row + 1][col].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row + 1][col].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row + 1,col));
                        }
                    }
                    if (row < n && col < n) {
                        if (!this.arrayWithCell[row + 1][col + 1].isBomb() && this.arrayWithCell[row + 1][col + 1].cellDisplay == cellDisplay.None){
                            this.arrayWithCell[row + 1][col + 1].cellDisplay = cellDisplay.Visible;
                            cellsToOpen.push(new BombPosition(row + 1,col + 1));
                        }
                    }
                }
            }
        }
    }
}

export enum backgroundStatus{
    Normal,Blood,Stars
}
