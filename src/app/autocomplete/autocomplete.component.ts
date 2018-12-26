import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  myControl = new FormControl();
  @Input() options: string[];
  @Input() editorCss: string;
  @Input() placeholder: string;
  @Input() isCourseSearch: boolean;
  @Input() isRequired = true;
  filteredOptions: Observable<string[]>;
  appearance = 'fill';
  outlineCss: string;
  defaultOptions: string[] = ['Calculus 1b', 'Intro to CS', 'Linear Algebra', 'Discrete Mathematics', 'Complexity',
    'Micro-Economics', 'Funding', 'Statistics'];


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
}
