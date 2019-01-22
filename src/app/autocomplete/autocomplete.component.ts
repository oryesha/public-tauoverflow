import {Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
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
export class AutocompleteComponent implements OnInit {
  @ViewChild('input') inputEl: ElementRef;

  myControl = new FormControl();
  @Input() options: string[];
  @Input() editorCss: string;
  @Input() placeholder: string;
  @Input() isCourseSearch: boolean;
  @Input() isRequired = true;

  @Output() private optionSelected = new EventEmitter<string>();

  filteredOptions: Observable<string[]>;
  appearance = 'fill';
  outlineCss: string;
  defaultOptions: string[] = ['Calculus 1b', 'Intro to CS', 'Linear Algebra', 'Discrete Mathematics', 'Complexity',
    'Micro-Economics', 'Funding', 'Statistics'];

  private _isSelectionValid(): boolean {
    return (this.options || this.defaultOptions)
        .indexOf(this.inputEl.nativeElement.value) > -1;
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
}
