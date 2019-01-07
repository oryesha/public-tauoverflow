import {Component, OnInit} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {UiCourse} from '../models/ui-course.model';
import {UserService} from '../services/user.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {CourseService} from '../services/course.service';
import {PostContent} from '../post-editor/post-editor.component';
import {Question} from '../models/question.model';
import {UserProfile} from '../models/user-profile.model';
import {QuestionService} from '../services/question.service';

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
              private routingDataService: AppRoutingDataService) {}


  ngOnInit() {
    this.courses = this.routingDataService.getRoutingData('selectedCourses').getData();
    // this.userService.getUser();
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
    const question = new Question(subject, content, this.user, this.courses);
    this.questionService.createQuestion(question).subscribe((response: any) => {
      question.id = response.data.id;
    });
  }
}
