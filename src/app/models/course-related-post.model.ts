import {Post} from './post.model';
import {UserProfile} from './user-profile.model';
import {UiCourse} from './ui-course.model';

export class CourseRelatedPost extends Post {
  uiCourse: UiCourse;

  constructor(subject: string, content: string, owner: UserProfile, uiCourse: UiCourse) {
    super(subject, content, owner);
    this.uiCourse = uiCourse;
  }
}
