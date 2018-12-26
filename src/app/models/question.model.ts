import {Post} from './post.model';
import {Answer} from './answer.model';
import {Course} from './course.model';
import {Upvote} from './upvote.model';
import {UserProfile} from './user-profile.model';
import DateTimeFormat = Intl.DateTimeFormat;

export class Question extends Post {
   _id: string;
  relatedCourses: Course[];
  answers: Answer[];
  upvote: Upvote;

  constructor(subject: string, content: string, owner: UserProfile, timeStamp: DateTimeFormat,
              isLocked: boolean, relatedCourses: Course[], answers: Answer[], upvote: Upvote) {
    super(subject, content, owner, timeStamp, isLocked);
    this.relatedCourses = relatedCourses;
    this.answers = answers;
    this.upvote = upvote;
  }
}
