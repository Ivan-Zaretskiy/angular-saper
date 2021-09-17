export class BombPosition {
    constructor(public row: number, public column: number) {
    }

    public existIn(pos: BombPosition): boolean {
        return this.row === pos.row && this.column === pos.column;
    }

    public checkForEmptyRowNearCell(pos: BombPosition) : boolean {
        return Math.abs(pos.row - this.row) < 3 && Math.abs(pos.column - this.column) < 3;
    }
}

export enum gameStatus {
    Start, In_Progress, End
}
