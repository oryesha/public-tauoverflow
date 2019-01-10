import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {MatDialogConfig} from '@angular/material/dialog';
import {CourseService} from '../services/course.service';
import {QueryService} from '../services/query.service';
import {Question} from '../models/question.model';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  showResults: boolean = false;
  questions: Question[];
  constructor(private dialog: MatDialog,
              private courseService: CourseService,
              private queryService: QueryService) { }

  @Input() isSearchQuestion: boolean;
  private searcContent: string;
  private selectedFilters: string[] = [];
  private hasFilters: boolean;

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      id: 1,
      title: 'Filter search by course names',
      isSearch: true,
      selected: this.selectedFilters.slice()
    };
    this.dialog
        .open(FilterDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe( (result: string[]) => {
          this.selectedFilters = result ? result : this.selectedFilters;
          this.hasFilters = this.selectedFilters.length > 0;
        });
  }

  remove(filter: string) {
    const index = this.selectedFilters.indexOf(filter);
    if (index >= 0) {
      this.selectedFilters.splice(index, 1);
      this.hasFilters = this.selectedFilters.length > 0;
    }
  }
  getQuestionsFromQuery(query: string, filters: string[]) {
    const courseMap = this.courseService.getCoursesMap();
    const filtersId: string[] = [];
    filtersId.push('');
    filters.forEach((filter: string) => {
      filtersId.push(courseMap[filter].courseNumber);
    });
    console.log('WOW!');
    this.queryService.getQueryResult(query, filtersId).subscribe(questions => {
      // assign the questions list property to the proper http response
      this.questions = questions;
      this.showResults = true;
      console.log(questions);
    });
  }

  ngOnInit() {
  }
}


