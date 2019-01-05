import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatButton} from '@angular/material';
import {MultiSelectAutocompleteComponent} from '../multi-select-autocomplete/multi-select-autocomplete.component';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  title = 'Choose Relevant Courses';
  isSearch: boolean;
  @ViewChild('chooseButton') chooseButton: MatButton;
  @ViewChild('multiSelect') multiSelectAutocomplete: MultiSelectAutocompleteComponent;
  selected: string[] = [];
  disabled = true;

  constructor(
    private dialogRef: MatDialogRef<FilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.isSearch = data.isSearch;
    this.selected = data.selected;
  }

  ngOnInit() {
    this.disabled = this.selected.length === 0;
  }

  close() {
    this.dialogRef.close(this.multiSelectAutocomplete.getSelectedOptions());
  }

  maybeDisableButton(event: number) {
    this.chooseButton.disabled = event === 0;
  }
}
