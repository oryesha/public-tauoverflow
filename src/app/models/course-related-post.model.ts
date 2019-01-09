import {Post} from './post.model';
import {UserProfile} from './user-profile.model';
import {UiCourse} from './ui-course.model';

export class CourseRelatedPost extends Post {
  uiCourse: UiCourse;

  constructor(subject: string, content: string, owner: UserProfile, uiCourse: UiCourse) {
    super(subject, content, owner);
    this.uiCourse = uiCourse;
  }

  static deserialize(dbPost: any): CourseRelatedPost {
    const owner = UserProfile.deserialize(dbPost.owner);
    const uiCourse = UiCourse.deserialize(dbPost.course);
    return new CourseRelatedPost(dbPost.subject, dbPost.content, owner, uiCourse);
  }
}
