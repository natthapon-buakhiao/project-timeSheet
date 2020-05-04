import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceSupervisorComponent } from './attendance-supervisor.component';

describe('AttendanceSupervisorComponent', () => {
  let component: AttendanceSupervisorComponent;
  let fixture: ComponentFixture<AttendanceSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceSupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
