import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  courses = new FormControl();
  coursesList: string[] = ['Algebra', 'History', 'Physics']
  description = 'Choose Relevant Courses';
  constructor(
              private dialogRef: MatDialogRef<FilterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.description = data.title;
  }
  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }

}
