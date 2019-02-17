import {isUndefined} from 'util';

export class NotificationSettings {
  // true iff notifications are enabled when someone answers my question.
  notifyOnMyQuestions;
  // true iff notifications are enabled when someone answers a question I marked as favorite.
  notifyOnMyFavorites;
  // true iff notifications are enabled when someone asked a question in a one of my courses.
  notifyOnMyCourses;
  // true iff notifications are enabled when someone asked a question in a course I'm skilled at.
  notifyOnMySkills;

  constructor(notifyOnMyQuestions?: boolean,
              notifyOnMyFavorites?: boolean,
              notifyOnMyCourses?: boolean,
              notifyOnMySkills?: boolean) {
    this.notifyOnMyQuestions = isUndefined(notifyOnMyQuestions) ? true : notifyOnMyQuestions;
    this.notifyOnMyFavorites = isUndefined(notifyOnMyFavorites) ? true : notifyOnMyFavorites;
    this.notifyOnMyCourses = isUndefined(notifyOnMyCourses) ? true : notifyOnMyCourses;
    this.notifyOnMySkills = isUndefined(notifyOnMySkills) ? true : notifyOnMySkills;
  }

  clone(): NotificationSettings {
    return new NotificationSettings(this.notifyOnMyQuestions, this.notifyOnMyFavorites,
      this.notifyOnMyCourses, this.notifyOnMySkills);
  }

  equals(other: NotificationSettings): boolean {
    return this.notifyOnMySkills === other.notifyOnMySkills &&
      this.notifyOnMyQuestions === other.notifyOnMyQuestions &&
      this.notifyOnMyCourses === other.notifyOnMyCourses &&
      this.notifyOnMyFavorites === other.notifyOnMyFavorites;
  }
}

export class NotificationOptions {
  public static readonly MY_QUESTIONS = 'MY_QUESTIONS';
  public static readonly MY_FAVORITES = 'MY_FAVORITES';
  public static readonly MY_COURSES = 'MY_COURSES';
  public static readonly MY_SKILLS = 'MY_SKILLS';

  private constructor() {}
}
