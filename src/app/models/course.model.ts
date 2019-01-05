import {CourseReview} from './course-review.model';
import {Question} from './question.model';
import {PartnerPost} from './partner-post.model';
import {Post} from './post.model';
import {UiCourse} from './ui-course.model';
import {Deserializable} from './deserializable';

export class Course {
  id: string;
  uiCourse: UiCourse;
  questions: Question[] = [];
  reviews: CourseReview[] = [];
  partnerPosts: PartnerPost[] = [];
  changeHours: Post[] = [];
  rank = 0;

  constructor(uiCourse: UiCourse) {
    this.uiCourse = uiCourse;
    this.id = uiCourse.courseId;
  }
}
