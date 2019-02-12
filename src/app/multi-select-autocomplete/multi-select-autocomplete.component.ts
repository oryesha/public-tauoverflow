import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material';
import {UiCourse} from '../models/ui-course.model';

interface OptionMap {
  [name: string]: boolean;
}

interface SelectedMap {
  [name: string]: string;
}

@Component({
  selector: 'app-multi-select-autocomplete',
  templateUrl: './multi-select-autocomplete.component.html',
  styleUrls: ['./multi-select-autocomplete.component.scss']
})
export class MultiSelectAutocompleteComponent implements OnInit, AfterViewChecked {
  @Input() private options: UiCourse[];
  @Input() private placeholder: string;
  @Input() private isCourseSearch: boolean;
  @Input() private selectedOptions: string[] = [];
  @Input() private isRequired = true;
  @Output() private inputChanged = new EventEmitter();
  private filteredOptions: Observable<string[]>;
  readonly separatorKeys: number[] = [ENTER, COMMA];
  private allOptions: OptionMap = {};
  private selectedMap: SelectedMap = {};
  private selectableOptions: string[];
  private optionsControl = new FormControl({value: '', disabled: this.selectedOptions.length >= 5});

  @ViewChild('optionsInput') optionsInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor() {}

  ngOnInit() {
    this.selectableOptions = this.options.map(option => option.name + ' - ' + option.courseNumber);
    // Initialize allOptions map.
    this.selectableOptions.forEach(opt => this.allOptions[opt] = false);
    // If on init options were already selected (e.g., when clicking the filter button after
    // choosing filters), then mark those options as selected.
    this.selectedOptions.forEach(opt => this.allOptions[opt] = true);
    this.filteredOptions = this.optionsControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
  }

  ngAfterViewChecked() {
    if (this.selectedOptions.length >= 5) {
      this.optionsInput.nativeElement.disabled = true;
      this.optionsInput.nativeElement.placeholder = '';
    }
  }

  removeSelected(selectedOption: string) {
    const index = this.selectedOptions.indexOf(selectedOption);
    if (index >= 0) {
      const removed = this._concatRemoved(selectedOption);
      this.allOptions[removed] = false;
      this.selectedOptions.splice(index, 1);
      this._resetInput();
      this.inputChanged.emit(this.selectedOptions.length);
    }
  }

  private _concatRemoved(removed: string) {
    const number = this.selectedMap[removed];
    delete this.selectedMap[removed];
    return removed + ' - ' + number;
  }

  displaySelected(event: MatAutocompleteSelectedEvent) {
    const selected = event.option.viewValue;
    this.allOptions[selected] = true;
    const parsedSelected = this._parseSelected(selected);
    this.selectedOptions.push(parsedSelected);
    this._resetInput();
    this.inputChanged.emit(this.selectedOptions.length);
  }

  private _parseSelected(selected: string) {
    const split = selected.split(' - ');
    const name = split[0];
    this.selectedMap[name] = split[1];
    return name;
  }

  getSelectedOptions(): string[] {
    return this.selectedOptions.slice();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.selectableOptions.filter(option => {
      return option.toLowerCase().includes(filterValue) && !this.allOptions[option];
    });
  }

  private _resetInput() {
    this.optionsInput.nativeElement.value = '';
    const disableInputEl = this.selectedOptions.length >= 5;
    this.optionsInput.nativeElement.disabled = disableInputEl;
    this.optionsControl.setValue('');
    this.optionsInput.nativeElement.placeholder = disableInputEl ? '' : this.placeholder;
  }
}
