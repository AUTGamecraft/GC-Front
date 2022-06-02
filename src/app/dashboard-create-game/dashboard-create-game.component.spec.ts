import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardCreateGameComponent } from './dashboard-create-game.component';

describe('DashboardCreateGameComponent', () => {
  let component: DashboardCreateGameComponent;
  let fixture: ComponentFixture<DashboardCreateGameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCreateGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCreateGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
