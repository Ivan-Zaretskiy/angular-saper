export class BombPosition {
    constructor(public row: number, public column: number) {
    }

    public existIn(pos: BombPosition): boolean {
        return this.row === pos.row && this.column === pos.column;
    }
}

export enum gameStatus {
    Start, In_Progress, End
}
