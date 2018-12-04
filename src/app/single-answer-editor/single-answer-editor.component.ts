import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-single-answer-editor',
  templateUrl: './single-answer-editor.component.html',
  styleUrls: ['./single-answer-editor.component.scss']
})
export class SingleAnswerEditorComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
