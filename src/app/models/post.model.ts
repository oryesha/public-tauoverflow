import {UserProfile} from './user-profile.model';

export class Post {
  id: string;
  subject: string;
  content: string;
  owner: UserProfile;
  timeStamp = new Date(Date.now());
  isLocked = false;

  constructor(subject: string, content: string, owner: UserProfile,
              id?: string, timestamp?: Date, isLocked?: boolean) {
    this.subject = subject;
    this.content = content;
    this.owner = owner;
    if (id) {
      this.id = id;
      this.timeStamp = timestamp;
      this.isLocked = isLocked;
    }
  }
}
