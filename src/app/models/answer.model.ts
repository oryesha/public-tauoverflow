import {Upvote} from './upvote.model';
import {UiUser} from './ui-user.model';

export class Answer {
  id: string;
  content: string;
  upvote: Upvote;
  timestamp = new Date(Date.now());
  owner: UiUser;
  questionId: string;

  constructor(content: string, owner: UiUser, questionId: string, id?: string, timestamp?: Date) {
    this.content = content;
    this.upvote = new Upvote();
    this.owner = owner;
    this.questionId = questionId;
    if (id) {
      this.id = id;
      this.timestamp = timestamp;
    }
  }

  static deserialize(answer: any): Answer {
    const owner = UiUser.deserialize(answer.owner);
    const timestamp = new Date(answer.timestamp);
    return new Answer(answer.content, owner, answer.questionId, answer._id, timestamp);
  }

}
