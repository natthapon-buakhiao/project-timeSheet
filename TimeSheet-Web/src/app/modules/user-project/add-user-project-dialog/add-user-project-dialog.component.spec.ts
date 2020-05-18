import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserProjectDialogComponent } from './add-user-project-dialog.component';

describe('AddUserProjectDialogComponent', () => {
  let component: AddUserProjectDialogComponent;
  let fixture: ComponentFixture<AddUserProjectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserProjectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
