import {Post} from './post.model';
import {UiCourse} from './ui-course.model';
import {UiUser} from './ui-user.model';

export class CourseRelatedPost extends Post {
  uiCourse: UiCourse;

  constructor(subject: string, content: string, owner: UiUser, uiCourse: UiCourse, id?: string) {
    super(subject, content, owner, id);
    this.uiCourse = uiCourse;
  }

  static deserialize(dbPost: any): CourseRelatedPost {
    const owner = UiUser.deserialize(dbPost.owner);
    const uiCourse = UiCourse.deserialize(dbPost.course);
    return new CourseRelatedPost(dbPost.subject, dbPost.content, owner, uiCourse, dbPost._id);
  }
}
