import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {BombPosition} from '../bomb-position/bomb-position';
@Component({
    selector: 'app-bomb',
    templateUrl: './bomb.component.html',
    styleUrls: ['./bomb.component.css']
})
export class BombComponent implements OnInit {
    public pos: BombPosition;
    @Output() public EventOnLeftClick: EventEmitter<BombPosition> = new EventEmitter();
    @Output() public EventOnRightClick: EventEmitter<BombPosition> = new EventEmitter();


    constructor() { }

    ngOnInit(): void {
    }

    @Input()
    public set position (pos:[number,number]){
        this.pos = new BombPosition(pos[0],pos[1]);
    }

    public leftClickBomb(event:any){
        event.preventDefault();
        this.EventOnLeftClick.emit(this.pos);
        console.log('left');
    }

    public rightClickBomb(event:any){
        event.preventDefault();
        this.EventOnRightClick.emit(this.pos);
        console.log('right');
    }
}
