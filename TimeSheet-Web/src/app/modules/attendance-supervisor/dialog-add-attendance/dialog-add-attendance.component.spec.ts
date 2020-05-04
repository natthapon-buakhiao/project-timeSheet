import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddAttendanceComponent } from './dialog-add-attendance.component';

describe('DialogAddAttendanceComponent', () => {
  let component: DialogAddAttendanceComponent;
  let fixture: ComponentFixture<DialogAddAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
