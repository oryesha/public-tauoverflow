import {Post} from './post.model';
import {Course} from './course.model';
import {Name} from './name.model';
import {Question} from './question.model';

export class UserProfile {
  _id: string;
  name: Name;
  program: string;
  email: string;
  rank = 0;
  image: string = ''; // TODO(nati): Decide how this should look.
  asked = 0;
  answered = 0;
  description = '';
  skills: Course[] = [];
  favorites: Post[] = [];
  myQuestions: Question[] = [];
  myCourses: Course[] = [];
  isNewUser = true;

  constructor(id: string, firstName: string, lastName: string, email: string, isNewUser?: boolean) {
    this._id = id;
    this.name = new Name(firstName, lastName);
    this.email = email;
    this.isNewUser = isNewUser;
  }
}
