import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfirmConfirmComponent } from './confirm-confirm.component';

describe('ConfirmConfirmComponent', () => {
  let component: ConfirmConfirmComponent;
  let fixture: ComponentFixture<ConfirmConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
