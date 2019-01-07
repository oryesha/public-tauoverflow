import {Post} from './post.model';
import {Answer} from './answer.model';
import {Upvote} from './upvote.model';
import {UserProfile} from './user-profile.model';
import {UiCourse} from './ui-course.model';
import {RoutingData} from '../app-routing-data.service';

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

export class QuestionNavigationData implements RoutingData<Question> {
  constructor(private question: Question) {}

  getData(): Question {
    return this.question;
  }
}
