import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {MultiSelectAutocompleteComponent} from '../multi-select-autocomplete/multi-select-autocomplete.component';
import {FormFieldComponent} from '../form-field/form-field.component';
import {UserProfile} from '../models/user-profile.model';
import {CourseService} from '../services/course.service';
import {Program} from '../models/program.model';
import {UiCourse} from '../models/ui-course.model';

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
  selectedProgram: string;
  description: string;
  selectedSkills: string[];
  user: UserProfile;
  firstInit: boolean;
  programs: Program[];
  courses: UiCourse[] = [];
  private base64Image: string;

  constructor(
    private dialogRef: MatDialogRef<InitialDetailsDialogComponent>,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) data,
    private snackBar: MatSnackBar) {
    this.title = data.title;
    this.user = data.user;
    this.selectedProgram = data.selectedProgram;
    this.description = data.description;
    this.selectedSkills = data.selectedSkills ? data.selectedSkills : [];
    this.firstInit = data.firstInit;
    this.programs = data.programs;
    this.courses = this.courseService.getCourses();
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

  saveImage(image: any) {
    this.base64Image = image;
  }
}
