import {CourseRelatedPost} from './course-related-post.model';
import {UserProfile} from './user-profile.model';
import DateTimeFormat = Intl.DateTimeFormat;

export class CourseReview extends CourseRelatedPost {
  private rank: number;

  constructor(subject: string, content: string, owner: UserProfile, timeStamp: DateTimeFormat, isLocked: boolean, courseName: string, rank: number) {
    super(subject, content, owner, timeStamp, isLocked, courseName);
    this.rank = rank;
  }
}
