import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {MultiSelectAutocompleteComponent} from '../multi-select-autocomplete/multi-select-autocomplete.component';
import {FormFieldComponent} from '../form-field/form-field.component';
import {UserProfile} from '../models/user-profile.model';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-initial-details-dialog',
  templateUrl: './initial-details-dialog.component.html',
  styleUrls: ['./initial-details-dialog.component.scss']
})
export class InitialDetailsDialogComponent implements OnInit {
  @ViewChild('programAutocomplete') programAutocomplete: AutocompleteComponent;
  @ViewChild('skillsMultiselect') skillsMultiselect: MultiSelectAutocompleteComponent;
  @ViewChild('descriptionField') descriptionField: FormFieldComponent;
  title: string;
  user: UserProfile;
  programs: string[] = ['Computer Science', 'Electrical Engineering', 'Law', 'Computer Science and Electrical Engineering', 'Economics',
    'Management', 'Physics', 'Chemistry'];
  courses: string[] = this.courseService.getCourseNames();
  private base64Image: string;

  constructor(
    private dialogRef: MatDialogRef<InitialDetailsDialogComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar) {
    this.title = data.title;
    this.user = data.user;
  }

  ngOnInit() {
  }

  checkFormAndSubmit() {
    const program = this.programAutocomplete.getSelection();
    if (!program) {
      this.snackBar.open('Please select a valid program', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
    } else {
      this.dialogRef.close({
        program: program,
        description: this.descriptionField.getContent(),
        skills: this.skillsMultiselect.getSelectedOptions(),
        image: this.base64Image
      });
    }
  }

  convertImage(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private _handleReaderLoaded(readerEvt) {
    const binaryString = readerEvt.target.result;
    this.base64Image = btoa(binaryString);
  }
}
