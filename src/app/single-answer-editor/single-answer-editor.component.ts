import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {PostContent} from '../post-editor/post-editor.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-single-answer-editor',
  templateUrl: './single-answer-editor.component.html',
  styleUrls: ['./single-answer-editor.component.scss']
})
export class SingleAnswerEditorComponent implements OnInit {
  @Output() answerSubmitted = new EventEmitter<PostContent>();
  content = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    // uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: 'redText',
        class: 'redText'
      },
    ]
  };

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submitAnswer() {
    if (this.content === '') {
      this.snackBar.open('Empty answer isn\'t allowed', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
    } else {
      this.answerSubmitted.emit(new PostContent('', '', this.content));
    }
  }

}
