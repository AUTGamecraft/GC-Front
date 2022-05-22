import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameContentComponent } from './game-content.component';

describe('GameContentComponent', () => {
  let component: GameContentComponent;
  let fixture: ComponentFixture<GameContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
