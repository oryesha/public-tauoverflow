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
  @Input() homePageCssClass: string;
  @Input() placeholder: string;
  @Input() isCourseSearch: boolean;
  filteredOptions: Observable<string[]>;
  defaultOptions: string[] = ['Calculus 1b', 'Intro to CS', 'Linear Algebra', 'Discrete Mathematics', 'Complexity',
    'Micro-Economics', 'Funding', 'Statistics'];


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    const optionsToFilter = this.options || this.defaultOptions;

    return optionsToFilter.filter(option => option.toLowerCase().includes(filterValue));
  }
}
