import {CourseReview} from './course-review.model';
import {Question} from './question.model';
import {PartnerPost} from './partner-post.model';
import {Post} from './post.model';
import {UiCourse} from './ui-course.model';

export class Course {
  uiCourse: UiCourse;
  questions: Question[] = [];
  reviews: CourseReview[] = [];
  partnerPosts: PartnerPost[] = [];
  changeHours: Post[] = [];
  rank = 0;

  constructor(uiCourse: UiCourse) {
    this.uiCourse = uiCourse;
  }
}
