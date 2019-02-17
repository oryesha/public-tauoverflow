import { Component, OnInit } from '@angular/core';
import {UiCourse} from '../models/ui-course.model';
import {UserProfile} from '../models/user-profile.model';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {UserService} from '../services/user.service';
import {CourseService} from '../services/course.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import {AppRoutingDataService} from '../app-routing-data.service';
import {PostContent} from '../post-editor/post-editor.component';
import {PostType} from '../models/post.model';
import {ChangeHoursPost} from '../models/change-hours-post.model';
import {ChangeHoursPostService} from '../services/change-hours-post.service';

@Component({
  selector: 'app-change-hours-editor',
  templateUrl: './change-hours-editor.component.html',
  styleUrls: ['./change-hours-editor.component.scss']
})
export class ChangeHoursEditorComponent implements OnInit {

  course: UiCourse;
  user: UserProfile;
  coursesMap: UiCoursesMap;
  isCourseChosen = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: 'redText',
        class: 'redText'
      },
    ]
  };

  constructor(private userService: UserService,
              private courseService: CourseService,
              private changeHoursPostService: ChangeHoursPostService,
              private router: Router,
              private snackBar: MatSnackBar,
              private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
    const routingData = this.routingDataService.getRoutingData('selectedCourses');
    if (routingData) {
      const courses = routingData.getData();
      if (courses) {
        this.isCourseChosen = true;
        this.course = courses[0];
      }
    } else {
      this.router.navigate(['home-page']);
      return;
    }
    this.userService.getUser().then((user: UserProfile) => {
      this.user = user;
    });
    this.courseService.waitForCourses().then(() =>
      this.coursesMap = this.courseService.getCoursesMap()
    );
  }

  postChangeHours(event: PostContent) {
    const subject = event.subject;
    const content = event.content;
    const changeHoursPost = new ChangeHoursPost(subject, content, this.user.getUiUser(), this.course);
    this.user.myChangeHoursPosts.push(changeHoursPost);
    this.changeHoursPostService.createChangeHoursPost(changeHoursPost).subscribe((response: any) => {
      changeHoursPost.id = response.data._id;
      this.snackBar.open(this.course.name + ' Change Hours Post Added!', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
      this.router.navigate(
        ['course-page'],
        {queryParams: {courseId: this.course.courseNumber, tab: PostType.CHANGE_HOURS}});
    });
  }

}

