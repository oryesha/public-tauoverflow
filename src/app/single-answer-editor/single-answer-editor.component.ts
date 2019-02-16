import {
  AfterViewChecked,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {PostContent} from '../post-editor/post-editor.component';
import {MatSnackBar} from '@angular/material';
import {EditorComponent} from '../editor/editor.component';

@Component({
  selector: 'app-single-answer-editor',
  templateUrl: './single-answer-editor.component.html',
  styleUrls: ['./single-answer-editor.component.scss']
})
export class SingleAnswerEditorComponent implements OnInit, AfterViewChecked {
  @ViewChild('editor') editor: EditorComponent;
  @Output() answerSubmitted = new EventEmitter<PostContent>();
  @Output() answerCanceled = new EventEmitter();
  @Output() rendered = new EventEmitter();

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  submitAnswer() {
    const content = this.editor.getContent();
    if (content === '') {
      this.snackBar.open('Empty answer isn\'t allowed', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
    } else {
      this.answerSubmitted.emit(new PostContent('', '', content));
    }
  }

  cancel () {
    this.answerCanceled.emit();
  }

  ngAfterViewChecked(): void {
    this.rendered.emit();
  }
}
