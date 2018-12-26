import DateTimeFormat = Intl.DateTimeFormat;
import {UserProfile} from './user-profile.model';

export class Post {
  subject: string;
  content: string;
  owner: UserProfile;
  timeStamp: DateTimeFormat;
  isLocked: boolean;

  constructor(subject: string, content: string, owner: UserProfile, timeStamp: DateTimeFormat, isLocked: boolean) {
    this.subject = subject;
    this.content = content;
    this.owner = owner;
    this.timeStamp = timeStamp;
    this.isLocked = isLocked;
  }
}
