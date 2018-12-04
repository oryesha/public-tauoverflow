import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-find-a-partner-editor',
  templateUrl: './find-a-partner-editor.component.html',
  styleUrls: ['./find-a-partner-editor.component.scss']
})
export class FindAPartnerEditorComponent implements OnInit {

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

}
