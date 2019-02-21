import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../app.service';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';


@Component({
  selector: 'app-course-page',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  static CourseNavigationData = class implements RoutingData<UiCourse> {
    constructor(private course: UiCourse) {}

    getData(): UiCourse {
      return this.course;
    }
  };

  @ViewChild('coursesPageWrapper') pageWrapper: ElementRef;

  isLoaded = false;
  isUserCoursesLoaded = false;
  allCourses: UiCourse[] = [];
  coursesToDisplay: UiCourse[] = [];
  myCourses: UiCourse[] = [];
  coursesMap: UiCoursesMap;
  user: UserProfile;
  loaded: number[] = [1];
  dummyRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  tabsContent: Element[] = [];

  constructor(private appService: AppService,
              private router: Router,
              private courseService: CourseService,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private routingDataService: AppRoutingDataService,
              private dialog: MatDialog) {
  }

  navigateToCoursePage(course: UiCourse|string) {
    let uiCourse;
    if (typeof course === 'string') {
      const name = course.split(' -- ')[0];
      uiCourse = this.coursesMap[name];
    } else {
      uiCourse = course;
    }
    const courseData = new CoursesComponent.CourseNavigationData(uiCourse);
    this.routingDataService.setRoutingData(uiCourse.courseNumber, courseData);
    this.router.navigate(['/course-page'], { queryParams: { courseId: uiCourse.courseNumber } });
  }

  ngOnInit() {
    this.courseService.waitForCourses().then(() => {
      this.coursesMap = this.courseService.getCoursesMap();
      this.allCourses = this.courseService.getCourses().slice();
      this.dummyRange.forEach(
        index => this.coursesToDisplay.push(this.allCourses[index])
      );
      this.isLoaded = true;
    });
    this.userService.getUser().then((user: UserProfile) => {
      this.user = user;
      this.myCourses = this.user.myCourses;
      this._sortMyCourses();
      this.isUserCoursesLoaded = true;
    });
  }

  private _sortMyCourses() {
    this.myCourses.sort((c1, c2) => {
      if (c1.name > c2.name) { return 1; }
      if (c1.name < c2.name) { return -1; }
      return 0;
    });
  }

  async addCourses() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Select your courses', selected: []};
    await this.courseService.waitForCourses();
    this.dialog.open(FilterDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: string[]) => {
        if (result) {
          this._addToMyCourses(result);
        }
      });
  }

  removeFromMyCourses(course: UiCourse) {
    const courseId = course.id;
    const index = this.user.myCourses.map((uiCourse: UiCourse) => uiCourse.id)
      .indexOf(courseId, 0);
    if (index > -1) {
      this.user.myCourses.splice(index, 1);
    }
    this._removeCourseFromMyCourses(courseId);
  }
  private _addToMyCourses(result: string[]) {
    const courseIds: string[] = [];
    result.forEach(courseName => {
      const uiCourse = this.coursesMap[courseName];
      const index = this.user.myCourses.map(course => course.id).indexOf(uiCourse.id);
      if (index === -1) {
        this.user.myCourses.push(uiCourse);
        courseIds.push(uiCourse.id);
      }
    });
    this._updateMyCourses(courseIds);
  }

  private _toast(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 2000 // Prompt the toast 2 seconds.
    });
  }

  private _updateMyCourses(courseIds: string[]) {
    this.userService.addToMyCourses(this.user, courseIds).subscribe(() => {
      this._toast('Course' + (courseIds.length > 1 ? 's' : '') + ' added successfully');
    });
  }

  private _removeCourseFromMyCourses(courseId: string) {
    this.userService.removeFromMyCourses(this.user, courseId).subscribe(() => {
      this._toast('Course removed successfully');
    });
  }

  showMore() {
    const offset = this.coursesToDisplay.length;
    this.dummyRange.forEach(
      index => {
        if (index + offset < this.allCourses.length) {
          this.coursesToDisplay.push(this.allCourses[index + offset]);
        }
      });
    const len = this.loaded.length;
    this.loaded.push(len + 1);
  }

  scrollToTop() {
    if (window.innerWidth <= 800) {
      const bodyContent = document.getElementsByClassName('mat-tab-body-content');
      if (bodyContent) {
        this.tabsContent.push(bodyContent[0], bodyContent[1]);
        this.tabsContent.forEach((elem) => elem.scrollTop = 0);
      }
      return;
    }
    if (this.pageWrapper) {
      this.pageWrapper.nativeElement.scrollTop = 0;
    }
  }
}
