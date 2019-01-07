import {UserProfile} from './user-profile.model';

export class Post {
  id: string;
  subject: string;
  content: string;
  owner: UserProfile;
  timeStamp: Date;
  isLocked: boolean;

  constructor(subject: string, content: string, owner: UserProfile) {
    this.subject = subject;
    this.content = content;
    this.owner = owner;
    this.timeStamp = new Date(Date.now());
    this.isLocked = false;
  }
}
