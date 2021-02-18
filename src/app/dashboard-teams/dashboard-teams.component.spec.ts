import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardTeamsComponent } from './dashboard-teams.component';

describe('DashboardTeamsComponent', () => {
  let component: DashboardTeamsComponent;
  let fixture: ComponentFixture<DashboardTeamsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
