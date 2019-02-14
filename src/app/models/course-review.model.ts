import {CourseRelatedPost} from './course-related-post.model';
import {UiCourse} from './ui-course.model';
import {UiUser} from './ui-user.model';

export class CourseReview extends CourseRelatedPost {
  rank: number;

  constructor(subject: string, content: string, owner: UiUser, uiCourse: UiCourse, rank: number, id?: string) {
    super(subject, content, owner, uiCourse, id);
    this.rank = rank;
  }

  static deserialize(dbReview: any): CourseReview {
    const owner = UiUser.deserialize(dbReview.owner);
    const uiCourse = UiCourse.deserialize(dbReview.course);
    return new CourseReview(dbReview.subject, dbReview.content, owner, uiCourse, dbReview.rank, dbReview._id);
  }
}
