import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {Router} from '@angular/router';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  static CourseList = class implements RoutingData<string[]> {
    constructor(private selectedCourses: string[]) {}

    getData(): string[] {
      return this.selectedCourses.slice();
    }
  };

  relatedCourses: string[] = [];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
  }

  openCoursesDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Select related courses', selected: []};
    this.dialog.open(FilterDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: string[]) => this._navigateToQuestionEditor(result)
    );
  }

  private _navigateToQuestionEditor(result: string[]) {
    const courseList = new HomePageComponent.CourseList(result);
    this.routingDataService.setRoutingData(courseList);
    this.router.navigate(['/question-editor']);
  }
}
