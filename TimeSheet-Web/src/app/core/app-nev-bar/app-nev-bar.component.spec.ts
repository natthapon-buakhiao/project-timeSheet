import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNevBarComponent } from './app-nev-bar.component';

describe('AppNevBarComponent', () => {
  let component: AppNevBarComponent;
  let fixture: ComponentFixture<AppNevBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppNevBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNevBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
