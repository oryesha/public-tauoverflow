import {CourseRelatedPost} from './course-related-post.model';
import {UserProfile} from './user-profile.model';
import {UiCourse} from './ui-course.model';
import {Question} from './question.model';

export class CourseReview extends CourseRelatedPost {
  rank: number;

  constructor(subject: string, content: string, owner: UserProfile, uiCourse: UiCourse, rank: number) {
    super(subject, content, owner, uiCourse);
    this.rank = rank;
  }

  static deserialize(dbReview: any): CourseReview {
    const owner = UserProfile.deserialize(dbReview.owner);
    const uiCourse = UiCourse.deserialize(dbReview.course);
    return new CourseReview(dbReview.subject, dbReview.content, owner, uiCourse, dbReview.rank);
  }
}
