import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

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
