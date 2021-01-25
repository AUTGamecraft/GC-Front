import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEventComponent } from './dashboard-event.component';

describe('DashboardEventComponent', () => {
  let component: DashboardEventComponent;
  let fixture: ComponentFixture<DashboardEventComponent>;

  beforeEach(async(() => {
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
