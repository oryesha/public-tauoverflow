export class Notification {
  id: string;
  subject: string;
  owner: string;
  timestamp = new Date(Date.now());
  isAnswer: boolean;
  isSeen = false;
  link: string;

  constructor(subject: string, owner: string, isSeen: boolean, isAnswer: boolean,
              link: string, id?: string, timestamp?: Date) {
    this.subject = subject;
    this.owner = owner;
    this.isAnswer = isAnswer;
    this.link = link;
    if (id) {
      this.id = id;
      this.isSeen = isSeen;
      this.timestamp = timestamp;
    }
  }

  static deserialize(notification: any): Notification {
    const timestamp = new Date(notification.timestamp);
    return new Notification(notification.subject, notification.owner, notification.isSeen,
      notification.isAnswer, notification.link, notification._id, timestamp);
  }

}
