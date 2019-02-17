import {Component, OnInit} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {UiCourse} from '../models/ui-course.model';
import {UserService} from '../services/user.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {CourseService} from '../services/course.service';
import {PostContent} from '../post-editor/post-editor.component';
import {Question, QuestionNavigationData} from '../models/question.model';
import {UserProfile} from '../models/user-profile.model';
import {QuestionService} from '../services/question.service';
import {Router} from '@angular/router';
import {MessagingService} from '../services/messaging.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {FilterDialogComponent} from '../filter-dialog/filter-dialog.component';
import {HomePageComponent} from '../home-page/home-page.component';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  isCourseChosen = true;
  courses: UiCourse[] = [];
  user: UserProfile;
  coursesMap: UiCoursesMap;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private questionService: QuestionService,
              private messagingService: MessagingService,
              private router: Router,
              private dialog: MatDialog,
              private routingDataService: AppRoutingDataService) {}


  ngOnInit() {
    this.courses = this.routingDataService.getRoutingData('selectedCourses').getData();
    this.userService.getUser().then((user: UserProfile) => {
      this.user = user;
    });
    this.coursesMap = this.courseService.getCoursesMap();
  }

  remove(course: UiCourse) {
    const index = this.courses.indexOf(course);
    if (index > 0) {
      this.courses.splice(index, 1);
    }
  }

  postQuestion(event: PostContent) {
    const subject = event.subject;
    const content = event.content;
    const question = new Question(subject, content, this.user.getUiUser(), this.courses);
    this.user.myQuestions.push(question);
    this.questionService.createQuestion(question).subscribe((response: any) => {
      question.id = response.data._id;
      this.user.asked += 1;
      this._sendNotificationToCourseRelatedSkilledUsers(question);
      this.routingDataService.setRoutingData('question', new QuestionNavigationData(question));
      this.router.navigate(['question-page'], {queryParams: {id: question.id}});
    });
  }

  async addRelatedCourses() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Add related courses', selected: this.courses.map(course => course.name)};
    await this.courseService.waitForCourses();
    this._initCourses();
    this.dialog.open(FilterDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: string[]) => {
        this.courses = [];
        result.forEach(courseName => {
          this.courses.push(this.coursesMap[courseName]);
        });
      }
    );
  }

  private _initCourses(): void {
    if (!this.coursesMap) {
      this.coursesMap = this.courseService.getCoursesMap();
    }
  }

  private async _navigateToQuestionEditor(result: string[]) {
    const uiCourses: UiCourse[] = [];
    result.forEach(courseName => {
      uiCourses.push(this.coursesMap[courseName]);
    });
    const courseList = new HomePageComponent.CourseList(uiCourses);
    this.routingDataService.setRoutingData('selectedCourses', courseList);
    this.router.navigate(['/question-editor']);
  }

  _sendNotificationToCourseRelatedSkilledUsers(question: Question) {
   this.courses.forEach((course) => {
     this.courseService.getSkilledUsers(course.id).subscribe((users) => {
       users.forEach((user) => {
         this.messagingService.sendMessage(user, question.subject,
           question.owner.name.first + ' ' + question.owner.name.last, question.id, false);
       });
     });
   });
  }
}
