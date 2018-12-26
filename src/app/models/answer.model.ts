import DateTimeFormat = Intl.DateTimeFormat;
import {UserProfile} from './user-profile.model';
import {Upvote} from './upvote.model';

export class Answer {
  private content: string;
  private upvote: Upvote;
  private timeStamp: DateTimeFormat;
  private owner: UserProfile;
  private questionId: string;

  constructor(content: string, upvote: Upvote, timeStamp: DateTimeFormat, owner: UserProfile, questionId: string) {
    this.content = content;
    this.upvote = upvote;
    this.timeStamp = timeStamp;
    this.owner = owner;
    this.questionId = questionId;
  }
}
