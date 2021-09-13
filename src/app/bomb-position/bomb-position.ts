export class BombPosition {
    constructor(public row: number, public column: number) {
    }

    public existIn(pos: BombPosition): boolean {
        console.log(this.row === pos.row && this.column === pos.column);
        if (this.row === pos.row && this.column === pos.column){
            console.log(this.row + "++++" + this.column);
            console.log("====");
            console.log(pos.row + "++++" + pos.column);
            console.log("");
            console.log("");
        }
        return this.row === pos.row && this.column === pos.column;
    }
}

export enum gameStatus {
    Start, In_Progress, End
}
