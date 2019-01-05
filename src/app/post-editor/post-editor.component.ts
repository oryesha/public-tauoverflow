import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {

  @Input() postTitle: string;
  @Input() isAskQuestion: boolean;
  @Input() isCourseReview: boolean;
  @Input() titleLabel: string;
  @Input() descriptionTitle: string;
  @Output() postSubmitted = new EventEmitter();

  htmlContent = '';
  newQuestion = '';
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

  constructor() { }

  ngOnInit() {
  }

  submitPost() {
    this.postSubmitted.emit(this.htmlContent);
    // this.newQuestion = this.htmlContent;
  }
}
