import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {UserProfile} from '../models/user-profile.model';
import {InitialDetailsDialogComponent} from '../initial-details-dialog/initial-details-dialog.component';
import {UiCourse} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {Question} from '../models/question.model';
import {MessagingService} from '../services/messaging.service';
import {QueryService} from '../services/query.service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  static CourseList = class implements RoutingData<UiCourse[]> {
    constructor(private selectedCourses: UiCourse[]) {
    }

    getData(): UiCourse[] {
      return this.selectedCourses.slice();
    }
  };

  @ViewChild('searchBar') searchBar: SearchBarComponent;
  relatedCourses: string[] = [];
  user: UserProfile;
  uiCoursesMap: UiCoursesMap;
  queryResults: Question[];
  selectedQueryFilters: string[] = [];
  query: string;
  showQuerySpinner = false;
  queryParamsSubscribe: Subscription;

  message;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService,
    private userService: UserService,
    private messagingService: MessagingService,
    private queryService: QueryService,
    private routingDataService: AppRoutingDataService) {
    this.queryParamsSubscribe = route.queryParams.subscribe((params) => {
      this._checkIfQueryView(params);
    });
    const routingData = this.routingDataService.getRoutingData('user');
    if (routingData) {
      this.user = routingData.getData();
      // this._getNotificationFromService(this.user);
      if (this.user.isNewUser) {
        this._openDetailsDialog();
      }
      this.routingDataService.setRoutingData('user', null);
    } else {
      this.userService.getUser(true).then((user: UserProfile) => {
        this.user = user;
        // this._getNotificationFromService(user);
      });
    }
  }

  ngOnInit() {
  }

  async openCoursesDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Select related courses', selected: []};
    await this.courseService.waitForCourses();
    this._initCourses();
    this.dialog.open(FilterDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: string[]) => this._navigateToQuestionEditor(result)
    );
  }

  private async _navigateToQuestionEditor(result: string[]) {
    const uiCourses: UiCourse[] = [];
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
    dialogConfig.data = {title: 'Please add additional information', user: this.user, firstInit: true};
    await this.courseService.waitForCourses();
    this._initCourses();
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

  private _initCourses(): void {
    if (!this.uiCoursesMap) {
      this.uiCoursesMap = this.courseService.getCoursesMap();
    }
  }

  private _checkIfQueryView(params: Params) {
    this.queryResults = undefined;
    if (params.query) {
      this.showQuerySpinner = true;
      this.query = params.query;
      this.selectedQueryFilters = params.filters ? params.filters.split(',') : [];
      this._getQueryResults();
    } else {
      this.showQuerySpinner = false;
      if (this.searchBar) {
        this.searchBar.updateElementsWithSearchParams('', []);
      }
    }
  }

  private _getQueryResults() {
    this.queryService.getQueryResult(this.query, this.selectedQueryFilters).subscribe(
      questions => {
        this.queryResults = this._parseQuestions(questions);
        this.showQuerySpinner = false;
        this.searchBar.updateElementsWithSearchParams(this.query, this.selectedQueryFilters);
      });
  }

  private _parseQuestions(resQuestions: any[]): Question[] {
    const questions: Question[] = [];
    resQuestions.forEach((question) => questions.push(Question.deserialize(question)));
    return questions;
  }

  ngOnDestroy(): void {
    this.queryParamsSubscribe.unsubscribe();
  }
}
