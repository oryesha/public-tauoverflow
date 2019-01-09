import {UserProfile} from './user-profile.model';
import {Upvote} from './upvote.model';

export class Answer {
  id: string;
  content: string;
  upvote: Upvote;
  timeStamp = new Date(Date.now());
  owner: UserProfile;
  questionId: string;

  constructor(content: string, owner: UserProfile, questionId: string, id?: string, timestamp?: Date) {
    this.content = content;
    this.upvote = new Upvote();
    this.owner = owner;
    this.questionId = questionId;
    if (id) {
      this.id = id;
      this.timeStamp = timestamp;
    }
  }

  static deserialize(answer: any): Answer {
    const owner = UserProfile.deserialize(answer.owner);
    const timestamp = new Date(answer.timeStamp);
    return new Answer(answer.content, owner, answer.questionId, answer._id, timestamp);
  }

}
