import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeHoursEditorComponent } from './change-hours-editor.component';

describe('ChangeHoursEditorComponent', () => {
  let component: ChangeHoursEditorComponent;
  let fixture: ComponentFixture<ChangeHoursEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeHoursEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeHoursEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
