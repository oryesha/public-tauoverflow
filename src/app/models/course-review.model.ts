import {CourseRelatedPost} from './course-related-post.model';
import {UserProfile} from './user-profile.model';
import {UiCourse} from './ui-course.model';

export class CourseReview extends CourseRelatedPost {
  rank: number;

  constructor(subject: string, content: string, owner: UserProfile, uiCourse: UiCourse, rank: number) {
    super(subject, content, owner, uiCourse);
    this.rank = rank;
  }
}
