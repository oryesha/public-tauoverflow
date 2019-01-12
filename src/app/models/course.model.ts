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

  static deserialize(dbCourse: any): Course {
    const uiCourse = new UiCourse(dbCourse._id, dbCourse.name, dbCourse.courseNumber);
    const course = new Course(uiCourse);
    dbCourse.questions.forEach((dbQuestion) => {
      const question = Question.deserialize(dbQuestion);
      course.questions.push(question);
    });
    let rankCounter = 0;
    dbCourse.reviews.forEach((dbReview) => {
      const review = CourseReview.deserialize(dbReview);
      course.reviews.push(review);
      rankCounter += review.rank;
    });
    course.rank = rankCounter === 0 ? 0 : rankCounter / course.reviews.length;
    dbCourse.partnerPosts.forEach((dbPartnerPost) => {
      const partnerPost = PartnerPost.deserialize(dbPartnerPost);
      course.partnerPosts.push(partnerPost);
    });
    // TODO: add deserialize to changeHours when it is implemented
    return course;
  }
}
