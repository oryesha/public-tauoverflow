import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleAnswerEditorComponent } from './single-answer-editor.component';

describe('SingleAnswerEditorComponent', () => {
  let component: SingleAnswerEditorComponent;
  let fixture: ComponentFixture<SingleAnswerEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleAnswerEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleAnswerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
