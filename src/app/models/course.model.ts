import {CourseReview} from './course-review.model';
import {Question} from './question.model';
import {PartnerPost} from './partner-post.model';
import {Post} from './post.model';

export class Course {
  name: string;
  courseId: string;
  questions: Question[];
  reviews: CourseReview[];
  partnerPosts: PartnerPost[];
  changeHours: Post[];
  rank: number;

  constructor(name: string, courseId: string, questions: Question[], reviews: CourseReview[],
              partnerPosts: PartnerPost[], changeHours: Post[], rank: number) {
    this.name = name;
    this.courseId = courseId;
    this.questions = questions;
    this.reviews = reviews;
    this.partnerPosts = partnerPosts;
    this.changeHours = changeHours;
    this.rank = rank;
  }
}
