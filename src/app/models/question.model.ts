import {Post} from './post.model';
import {Answer} from './answer.model';
import {Upvote} from './upvote.model';
import {UiCourse} from './ui-course.model';
import {RoutingData} from '../app-routing-data.service';
import {UiUser} from './ui-user.model';

export class Question extends Post {
  relatedCourses: UiCourse[];
  answers: Answer[] = [];
  interestedIn: string[] = [];
  upvote: Upvote;

  static deserialize(question): Question {
    const owner = UiUser.deserialize(question.owner);
    const relatedCourses = [];
    const answers = [];
    question.answers.forEach((dbAnswer) => {
      const answer = Answer.deserialize(dbAnswer);
      answers.push(answer);
    });
    question.relatedCourses.forEach((course) => {
      const uiCourse = UiCourse.deserialize(course);
      relatedCourses.push(uiCourse);
    });
    const timestamp = new Date(question.timestamp);
    const newQuestion = new Question(question.subject, question.content,
      owner, relatedCourses, answers, question._id, timestamp, question.isLocked);
    if (question.upvote.upvoters !== []) {
      newQuestion.upvote = question.upvote;
    }
    if (question.interestedIn) {
      question.interestedIn.forEach((user) => {
        newQuestion.interestedIn.push(user.firebaseToken);
      });
    }
    return newQuestion;
  }

  constructor(subject: string, content: string, owner: UiUser, relatedCourses: UiCourse[],
              answers?: Answer[], id?: string, timestamp?: Date, isLocked?: boolean) {
    super(subject, content, owner, id, timestamp, isLocked);
    this.relatedCourses = relatedCourses;
    if (answers) {
      this.answers = answers;
    }
    this.upvote = new Upvote();
  }
}

export class QuestionNavigationData implements RoutingData<Question> {
  constructor(private question: Question) {
  }

  getData(): Question {
    return this.question;
  }
}
