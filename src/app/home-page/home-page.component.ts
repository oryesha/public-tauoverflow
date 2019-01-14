import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {Router} from '@angular/router';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {UserProfile} from '../models/user-profile.model';
import {InitialDetailsDialogComponent} from '../initial-details-dialog/initial-details-dialog.component';
import {UiCourse} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {Question} from '../models/question.model';
import {MessagingService} from '../services/messaging.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  static CourseList = class implements RoutingData<UiCourse[]> {
    constructor(private selectedCourses: UiCourse[]) {
    }

    getData(): UiCourse[] {
      return this.selectedCourses.slice();
    }
  };

  relatedCourses: string[] = [];
  user: UserProfile;
  uiCoursesMap: UiCoursesMap;
  queryResults: Question[];

  message;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private messagingService: MessagingService,
    private routingDataService: AppRoutingDataService) {
    const routingData = this.routingDataService.getRoutingData('user');
    if (routingData) {
      this.user = routingData.getData();
      this._getNotificationFromService(this.user);
      if (this.user.isNewUser) {
        this._openDetailsDialog();
      }
    } else {
      this.userService.getUser().then(user => this._getNotificationFromService(user));
    }
  }
  _getNotificationFromService(user: UserProfile) {
    console.log(user.firebaseToken);
    const userId = user.firebaseToken;
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    console.log(this.message);
  }
  ngOnInit() {
  }

  showResults(event: Question[]) {
    this.queryResults = event;
  }

  async openCoursesDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Select related courses', selected: []};
    await this.courseService.waitForCourses();
    this.dialog.open(FilterDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: string[]) => this._navigateToQuestionEditor(result)
    );
  }

  private async _navigateToQuestionEditor(result: string[]) {
    const uiCourses: UiCourse[] = [];
    await this.courseService.waitForCourses();
    this.uiCoursesMap = this.courseService.getCoursesMap();
    result.forEach(courseName => {
      uiCourses.push(this.uiCoursesMap[courseName]);
    });
    const courseList = new HomePageComponent.CourseList(uiCourses);
    this.routingDataService.setRoutingData('selectedCourses', courseList);
    this.router.navigate(['/question-editor']);
  }

  private async _openDetailsDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Please add additional information', user: this.user};
    await this.courseService.waitForCourses();
    this.dialog.open(InitialDetailsDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        this.user.program = result.program;
        this.user.description = result.description;
        this._addUserSkills(result.skills);
        this.user.image = result.image;
        this.user.isNewUser = false;
        this.userService.updateUserDetails(this.user).subscribe(() => {
        });
      }
    );
  }

  private _addUserSkills(skills: string[]) {
    skills.forEach(skillName => {
      this.user.skills.push(this.uiCoursesMap[skillName]);
    });
  }
}
