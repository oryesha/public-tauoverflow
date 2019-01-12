import {UserProfile} from './user-profile.model';

export class Post {
  id: string;
  subject: string;
  content: string;
  owner: UserProfile;
  timestamp = new Date(Date.now());
  isLocked = false;

  constructor(subject: string, content: string, owner: UserProfile,
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
