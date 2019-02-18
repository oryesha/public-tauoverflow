import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormFieldComponent} from '../form-field/form-field.component';
import {EditorComponent} from '../editor/editor.component';


@Component({
  selector: 'app-edit-question-dialog',
  templateUrl: './edit-question-dialog.component.html',
  styleUrls: ['./edit-question-dialog.component.scss']
})
export class EditQuestionDialogComponent implements OnInit {
  @ViewChild('subjectField') subjectField: FormFieldComponent;
  @ViewChild('contentField') contentField: EditorComponent;

  subject: string;
  content: string;

  constructor(
    private dialogRef: MatDialogRef<EditQuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar) {
    this.subject = data.subject;
    this.content = data.content;
  }
  ngOnInit() {
  }
  checkFormAndSubmit() {
    if (!this.subject) {
      this.snackBar.open('Please enter a valid subject', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
    } if (!this.content) {
      this.snackBar.open('Please enter a valid content', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
    } else {
      this.dialogRef.close({
        subject: this.subjectField.getContent(),
        content: this.contentField.getContent()
      });
    }
  }

}
