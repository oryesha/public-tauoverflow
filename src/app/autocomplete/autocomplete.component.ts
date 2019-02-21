import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';
import {UiCourse} from '../models/ui-course.model';
import {Program} from '../models/program.model';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutocompleteComponent),
  multi: true
};

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('input') inputEl: ElementRef;

  myControl = new FormControl();
  @Input() options: Program[] | UiCourse[];
  @Input() editorCss: string;
  @Input() placeholder: string;
  @Input() isCourseSearch: boolean;
  @Input() isRequired = true;
  @Input() selectedOption: string;

  @Output() private optionSelected = new EventEmitter<string>();

  displayOptions: string[];

  filteredOptions: Observable<string[]>;
  appearance = 'fill';
  outlineCss: string;

  private _isSelectionValid(): boolean {
    return this.displayOptions.indexOf(this.inputEl.nativeElement.value) > -1;
  }

  ngOnInit() {
    this.displayOptions = this._parseOptions();
    if (this.selectedOption) {
      this.myControl.setValue(this.selectedOption);
    }
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    if (this.isCourseSearch) {
      this.appearance = 'outline';
      this.outlineCss = 'AutocompleteOutline';
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionsToFilter = this.displayOptions;
    return this._filterOptions(optionsToFilter, filterValue);
  }

  getSelection(): string {
    let selection: string = null;
    if (this.inputEl && this._isSelectionValid()) {
      selection = this.inputEl.nativeElement.value;
    }
    return selection;
  }

  emitOption(selectedOption: MatAutocompleteSelectedEvent) {
    this.optionSelected.emit(selectedOption.option.value);
  }

  private _parseOptions(): string[] {
    if (!this.options || this.options.length === 0) {
      return [];
    }
    const isProgramSelection = this.options[0] instanceof Program;
    if (isProgramSelection) {
      return (<Program[]>(this.options)).map((option: Program) => option.name);
    }
    return (<UiCourse[]>(this.options)).map((option: UiCourse) => option.name + ' -- ' + option.courseNumber);
  }

  private _filterOptions(optionsToFilter: string[], filterValue: string) {
    const ret: string[] = [];
    for (const option of optionsToFilter) {
      if (ret.length >= 20) {
        return ret;
      }
      if (option.toLowerCase().includes(filterValue) && option !== this.selectedOption) {
        ret.push(option);
      }
    }
    return ret;
  }
}
