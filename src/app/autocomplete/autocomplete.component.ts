import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ValidatorFn, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material';

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
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') inputEl: ElementRef;

  myControl = new FormControl();
  @Input() options: string[];
  @Input() editorCss: string;
  @Input() placeholder: string;
  @Input() isCourseSearch: boolean;
  @Input() isRequired = true;

  @Output() private optionSelected = new EventEmitter();

  filteredOptions: Observable<string[]>;
  appearance = 'fill';
  outlineCss: string;
  defaultOptions: string[] = ['Calculus 1b', 'Intro to CS', 'Linear Algebra', 'Discrete Mathematics', 'Complexity',
    'Micro-Economics', 'Funding', 'Statistics'];

  valid(value: string): boolean {
    return (this.options || this.defaultOptions).indexOf(value) > -1;
  }


  ngOnInit() {
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
    const optionsToFilter = this.options || this.defaultOptions;

    return optionsToFilter.filter(option => option.toLowerCase().includes(filterValue));
  }

  selected(event: MatAutocompleteSelectedEvent) {
    debugger;
    this.propagateChange(event.option.value);
    // this.optionSelected.emit(event.option.value);
  }

  handleDeletedOption(value: string) {
    // if (!(value in this.filteredOptions)) {
    //   this.optionChanged(value);
    // }
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }
}
