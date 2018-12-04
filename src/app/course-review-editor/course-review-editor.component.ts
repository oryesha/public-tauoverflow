import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-course-review-editor',
  templateUrl: './course-review-editor.component.html',
  styleUrls: ['./course-review-editor.component.scss']
})
export class CourseReviewEditorComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: 'redText',
        class: 'redText'
      },
    ]
  };

  numOfStars = 0;

  constructor() { }

  ngOnInit() {
  }

  updateStars(clickedStar: number): void {
    if (clickedStar === this.numOfStars) {
      --this.numOfStars;
    } else {
      this.numOfStars = clickedStar;
    }
  }

}
