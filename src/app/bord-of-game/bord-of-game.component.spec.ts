import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordOfGameComponent } from './bord-of-game.component';

describe('BordOfGameComponent', () => {
  let component: BordOfGameComponent;
  let fixture: ComponentFixture<BordOfGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BordOfGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BordOfGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
