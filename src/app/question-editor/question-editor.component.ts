import {Component, OnInit} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {UiCourse} from '../models/ui-course.model';
import {UserService} from '../services/user.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-question-editor',
  templateUrl: './question-editor.component.html',
  styleUrls: ['./question-editor.component.scss']
})
export class QuestionEditorComponent implements OnInit {

  isCourseChosen = true;
  courses: UiCourse[] = [];
  userId: string;
  coursesMap: UiCoursesMap;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private routingDataService: AppRoutingDataService) {}


  ngOnInit() {
    this.courses = this.routingDataService.getRoutingData('selectedCourses').getData();
    this.userId = this.userService.getCurrentUserId();
    this.coursesMap = this.courseService.getCoursesMap();
  }

  remove(course: string) {
    // const index = this.courses.indexOf(course);
    // if (index > 0) {
    //   this.courses.splice(index, 1);
    // }
  }

  postQuestion(event: string) {
    console.log(event);
  }
}
