export class BombPosition {
    constructor(public row: number, public column: number) {
    }

}

export enum gameStatus {
    Start, In_Progress, End
}
