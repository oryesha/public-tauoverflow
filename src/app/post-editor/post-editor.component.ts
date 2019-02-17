import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {FormFieldComponent} from '../form-field/form-field.component';
import {MatSnackBar} from '@angular/material';
import {CourseService} from '../services/course.service';
import {EditorComponent} from '../editor/editor.component';

export class PostContent {
  subject: string;
  course: string;
  content: string;

  constructor(subject: string, course: string, content: string) {
    this.subject = subject;
    this.course = course;
    this.content = content;
  }
}

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit {
  @ViewChild('programAutocomplete') programAutocomplete: AutocompleteComponent;
  @ViewChild('titleField') titleFormField: FormFieldComponent;
  @ViewChild('editor') editor: EditorComponent;

  @Input() postTitle: string;
  @Input() isAskQuestion: boolean;
  @Input() isCourseReview: boolean;
  @Input() isCourseChosen: boolean;
  @Input() titleLabel: string;
  @Input() descriptionTitle: string;
  @Input() courseName?: string;
  @Output() postSubmitted = new EventEmitter<PostContent>();

  constructor(private snackBar: MatSnackBar, private courseService: CourseService) { }

  ngOnInit() {
  }

  submitPost() {
    const subject = this.titleFormField.getContent();
    let course = '';
    if (!this.isAskQuestion && !this.isCourseChosen) {
      course = this.programAutocomplete.getSelection();
    }
    const postContent = this.editor.getContent();
    if (subject === '' || (course === '' && !this.isAskQuestion && !this.isCourseChosen) || postContent === '') {
      this.snackBar.open('Empty fields aren\'t allowed', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
    } else {
      this.postSubmitted.emit(new PostContent(subject, course, postContent));
    }
  }
}
