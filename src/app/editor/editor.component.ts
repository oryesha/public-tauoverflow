import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {AngularEditorComponent, AngularEditorConfig} from '@kolkov/angular-editor';
import {HttpRequestsService} from '../services/http-requests.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('angularEditor') editor: AngularEditorComponent;
  @Input() isAnswer: boolean;
  @Input() isQuestion: boolean;
  @Input() content: string;
  // content = '';
  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: this.httpRequests.getBaseUrl() + '/image-upload',
  };
  editorTextarea: HTMLDivElement;
  insertImageButton: HTMLButtonElement;

  constructor(private httpRequests: HttpRequestsService) { }

  ngOnInit() {
  }

  public getContent() {
    return this.content;
  }

  addLatexEquation() {
    this.content += `&lt;latex&gt;&lt;/latex&gt;`;
  }

  ngAfterViewInit(): void {
    const wrapper = this.editor.editorWrapper.nativeElement;
    this.editorTextarea = wrapper.getElementsByClassName('angular-editor-textarea')[0];
    this.insertImageButton = document.querySelector('[title="Insert Image"]');
  }

  addImage() {
    this.editorTextarea.focus();
    this.insertImageButton.click();
  }
}
