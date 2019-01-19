import {UserProfile} from './user-profile.model';
import {Upvote} from './upvote.model';

export class Answer {
  id: string;
  content: string;
  upvote: Upvote;
  timestamp = new Date(Date.now());
  owner: UserProfile;
  questionId: string;

  constructor(content: string, owner: UserProfile, questionId: string, id?: string, timestamp?: Date,
              upvote?: Upvote) {
    this.content = content;
    if (upvote) {
      this.upvote = upvote;
    } else {
      this.upvote = new Upvote();
    }
    this.owner = owner;
    this.questionId = questionId;
    if (id) {
      this.id = id;
      this.timestamp = timestamp;
    }
  }

  static deserialize(answer: any): Answer {
    const owner = UserProfile.deserialize(answer.owner);
    const timestamp = new Date(answer.timestamp);
    return new Answer(answer.content, owner, answer.questionId, answer._id, timestamp, answer.upvote);
  }

}
