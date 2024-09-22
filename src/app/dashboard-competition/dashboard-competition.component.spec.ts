import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardEventComponent } from './dashboard-competition.component';

describe('DashboardEventComponent', () => {
  let component: DashboardEventComponent;
  let fixture: ComponentFixture<DashboardEventComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
