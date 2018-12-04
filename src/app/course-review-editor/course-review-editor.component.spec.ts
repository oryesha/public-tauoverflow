import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseReviewEditorComponent } from './course-review-editor.component';

describe('CourseReviewEditorComponent', () => {
  let component: CourseReviewEditorComponent;
  let fixture: ComponentFixture<CourseReviewEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseReviewEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseReviewEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
