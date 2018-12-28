import {Post} from './post.model';
import {UserProfile} from './user-profile.model';
import DateTimeFormat = Intl.DateTimeFormat;

export class CourseRelatedPost extends Post {
  courseName: string;

  constructor(subject: string, content: string, owner: UserProfile, timeStamp: DateTimeFormat,
              isLocked: boolean, courseName: string) {
    super(subject, content, owner, timeStamp, isLocked);
    this.courseName = courseName;
  }
}
