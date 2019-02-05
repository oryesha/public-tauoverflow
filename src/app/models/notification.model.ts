export class Notification {
  id: string;
  subject: string;
  owner: string;
  timestamp = new Date(Date.now());
  isAnswer: boolean;
  isSeen = false;
  questionId: string;

  constructor(subject: string, owner: string, isSeen: boolean, isAnswer: boolean,
              questionId: string, id?: string, timestamp?: Date) {
    this.subject = subject;
    this.owner = owner;
    this.isAnswer = isAnswer;
    this.questionId = questionId;
    if (id) {
      this.id = id;
      this.isSeen = isSeen;
      this.timestamp = timestamp;
    }
  }

  static deserialize(notification: any): Notification {
    const timestamp = new Date(notification.timestamp);
    return new Notification(notification.subject, notification.owner, notification.isSeen,
      notification.isAnswer, notification.questionId, notification._id, timestamp);
  }
  getNotificationWrapper(to: string): NotificationWrapper {
    return new NotificationWrapper(this, to);
  }

}

export class NotificationWrapper {
  notification: Notification;
  to: string;
  constructor(notification, to) {
    this.notification = notification;
    this.to = to;
  }
}
