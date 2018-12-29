import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {Router} from '@angular/router';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {UserProfile} from '../models/user-profile.model';
import {InitialDetailsDialogComponent} from '../initial-details-dialog/initial-details-dialog.component';
import {UiCourse} from '../models/ui-course.model';
import {Observable} from 'rxjs';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';

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
  user: UserProfile;
  uiCoursesObservable: Observable<UiCourse[]>;
  uiCoursesMap: {[name: string]: string};

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
    const routingData = this.routingDataService.getRoutingData('user');
    if (routingData) {
      this.user = routingData.getData();
      if (this.user.isNewUser) {
        this._openDetailsDialog();
      }
    }
    this.courseService.getUiCourses().subscribe((courses: any) => {
      courses.data.docs.forEach(course => this.uiCoursesMap[course.name] = course.courseId);
    });
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
    this.routingDataService.setRoutingData('selectedCourses', courseList);
    this.router.navigate(['/question-editor']);
  }

  private _openDetailsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Please add additional information', user: this.user};
    this.dialog.open(InitialDetailsDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        this.user.program = result.program;
        this.user.description = result.description;
        this._addUserSkills(result.skills);
        this.userService.updateUserDetails(this.user);
      }
    );
  }

  private _addUserSkills(skills: string[]) {
    skills.forEach(skillName => {
      this.user.skills.push(new UiCourse(skillName, this.uiCoursesMap[skillName]));
    });
  }
}
