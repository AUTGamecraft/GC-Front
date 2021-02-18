import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardMediaComponent } from './dashboard-media.component';

describe('DashboardMediaComponent', () => {
  let component: DashboardMediaComponent;
  let fixture: ComponentFixture<DashboardMediaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
