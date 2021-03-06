import {UiUser} from './ui-user.model';

export class Post {
  id: string;
  subject: string;
  content: string;
  owner: UiUser;
  timestamp = new Date(Date.now());
  isLocked = false;

  constructor(subject: string, content: string, owner: UiUser,
              id?: string, timestamp?: Date, isLocked?: boolean) {
    this.subject = subject;
    this.content = content;
    this.owner = owner;
    if (id) {
      this.id = id;
      this.timestamp = timestamp;
      this.isLocked = isLocked;
    }
  }
}

export enum PostType {
  QUESTION, REVIEW, PARTNER, CHANGE_HOURS
}
