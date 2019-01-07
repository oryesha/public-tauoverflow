import {UserProfile} from './user-profile.model';
import {Upvote} from './upvote.model';

export class Answer {
  id: string;
  content: string;
  upvote: Upvote;
  timeStamp: Date;
  owner: UserProfile;
  questionId: string;

  constructor(content: string, owner: UserProfile, questionId: string) {
    this.content = content;
    this.upvote = new Upvote();
    this.timeStamp = new Date(Date.now());
    this.owner = owner;
    this.questionId = questionId;
  }
}
