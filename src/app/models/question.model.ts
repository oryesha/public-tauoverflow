import {Post} from './post.model';
import {Answer} from './answer.model';
import {Upvote} from './upvote.model';
import {UserProfile} from './user-profile.model';
import {UiCourse} from './ui-course.model';

export class Question extends Post {
  relatedCourses: UiCourse[];
  answers: Answer[] = [];
  upvote: Upvote;

  constructor(subject: string, content: string, owner: UserProfile, relatedCourses: UiCourse[]) {
    super(subject, content, owner);
    this.relatedCourses = relatedCourses;
    this.upvote = new Upvote();
  }
}
