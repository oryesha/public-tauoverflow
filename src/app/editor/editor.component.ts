import {Component, Input, OnInit} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @Input() isAnswer: boolean;
  content = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    // uploadUrl: 'v1/images', // if needed
  };

  constructor() { }

  ngOnInit() {
  }

  public getContent() {
    return this.content;
  }

  addLatexEquation() {
    this.content += `&lt;latex&gt;&lt;/latex&gt;`;
  }
}
