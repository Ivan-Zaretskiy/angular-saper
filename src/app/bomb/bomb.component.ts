import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BombPosition} from '../bomb-position/bomb-position';
@Component({
    selector: 'app-bomb',
    templateUrl: './bomb.component.html',
    styleUrls: ['./bomb.component.css']
})
export class BombComponent implements OnInit {
    @Output() public EventOnLeftClick: EventEmitter<BombPosition> = new EventEmitter();
    @Output() public EventOnRightClick: EventEmitter<BombPosition> = new EventEmitter();
    public positionBomb!: BombPosition;
    public cellDisplayEnum: typeof cellDisplay = cellDisplay;
    public cellDisplay :cellDisplay = cellDisplay.None;

    constructor() { }

    ngOnInit(): void {
    }

    @Input()
    public set position (pos:[number,number]){
        this.positionBomb = new BombPosition(pos[0],pos[1]);
    }

    public leftClickBomb(event:any){
        event.preventDefault();
        this.EventOnLeftClick.emit(this.positionBomb);
    }

    public rightClickBomb(event:any){
        event.preventDefault();
        this.EventOnRightClick.emit(this.positionBomb);
    }
}
export enum cellDisplay{
    None,Visible,Bomb, Flag
}
