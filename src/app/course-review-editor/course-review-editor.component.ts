import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';
import {CourseService} from '../services/course.service';
import {ReviewService} from '../services/review.service';
import {Router} from '@angular/router';
import {AppRoutingDataService} from '../app-routing-data.service';
import {UiCourse} from '../models/ui-course.model';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {PostContent} from '../post-editor/post-editor.component';
import {CourseReview} from '../models/course-review.model';
import {MatSnackBar} from '@angular/material';
import {PostType} from '../models/post.model';

@Component({
  selector: 'app-course-review-editor',
  templateUrl: './course-review-editor.component.html',
  styleUrls: ['./course-review-editor.component.scss']
})
export class CourseReviewEditorComponent implements OnInit {

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

  numOfStars = 0;

  constructor(private userService: UserService,
              private courseService: CourseService,
              private reviewService: ReviewService,
              private router: Router,
              private snackBar: MatSnackBar,
              private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
    const courses = this.routingDataService.getRoutingData('selectedCourses').getData();
    if (courses) {
      this.isCourseChosen = true;
      this.course = courses[0];
    }
    this.userService.getUser().then((user: UserProfile) => {
      this.user = user;
    });
    this.courseService.waitForCourses().then(() => {
      this.coursesMap = this.courseService.getCoursesMap();
    });
  }

  updateStars(clickedStar: number): void {
    if (clickedStar === this.numOfStars) {
      --this.numOfStars;
    } else {
      this.numOfStars = clickedStar;
    }
  }

  postReview(event: PostContent) {
    const subject = event.subject;
    const content = event.content;
    if (this.numOfStars === 0) {
      this.snackBar.open('Please rank the course', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
      return;
    }
    const review = new CourseReview(subject, content, this.user.getUiUser(), this.course, this.numOfStars);
    this.user.myCourseReviews.push(review);
    this.reviewService.createReview(review).subscribe((response: any) => {
      review.id = response.data._id;
      this.snackBar.open(this.course.name + ' Review Added!', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
      this.router.navigate(
        ['course-page'],
        {queryParams: {courseId: this.course.courseNumber, tab: PostType.REVIEW}});
    });
  }
}
