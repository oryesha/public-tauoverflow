import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {MatDialogConfig} from '@angular/material/dialog';
import {CourseService} from '../services/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchBarInput') searchBarInput: ElementRef;

  constructor(private dialog: MatDialog,
              private courseService: CourseService,
              private router: Router) { }

  @Input() isSearchQuestion: boolean;
  public searchContent: string;
  private selectedFilters: string[] = [];
  public hasFilters: boolean;
  private isSearchResultsShown = false;

  async openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      id: 1,
      title: 'Filter search by course names',
      isSearch: true,
      selected: this.selectedFilters.slice()
    };
    await this.courseService.waitForCourses();
    this.dialog
        .open(FilterDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe( (result: string[]) => {
          this.selectedFilters = result ? result : this.selectedFilters;
          this.hasFilters = this.selectedFilters.length > 0;
          if (this.isSearchResultsShown) {
            this.initiateSearch();
          }
        });
  }

  remove(filter: string) {
    const index = this.selectedFilters.indexOf(filter);
    if (index >= 0) {
      this.selectedFilters.splice(index, 1);
      this.hasFilters = this.selectedFilters.length > 0;
      if (this.isSearchResultsShown) {
        this.initiateSearch();
      }
    }
  }

  ngOnInit() {}

  async updateElementsWithSearchParams(query: string, filters?: string[]) {
    await this.courseService.waitForCourses();
    this.isSearchResultsShown = true;
    this.selectedFilters = [];
    this.searchContent = query;
    if (filters) {
      filters.forEach((courseNumber) => {
        this.selectedFilters.push(this.courseService.getCourseName(courseNumber));
      });
      this.hasFilters = this.selectedFilters.length > 0;
    }
  }

  async initiateSearch() {
    if (!this.searchContent) {
      return;
    }
    await this.courseService.waitForCourses();
    const courseMap = this.courseService.getCoursesMap();
    const filterIds: string[] = [];
    this.selectedFilters.forEach((filter: string) => {
      filterIds.push(courseMap[filter].courseNumber);
    });
    const query = this.searchContent;
    const queryParams = filterIds.length > 0 ? {query, filters: filterIds.join(',')} : {query};
    this.router.navigate(['home-page'], {queryParams});
  }
}
