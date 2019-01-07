import {Post} from './post.model';
import {Course} from './course.model';
import {Name} from './name.model';
import {UiCourse} from './ui-course.model';

export class UserProfile {
  id: string;
  firebaseToken: string;
  name: Name;
  program = '';
  email: string;
  rank = 0;
  image: string = '../../assets/geffen.jpg'; // TODO(nati): Decide how this should look.
  asked = 0;
  answered = 0;
  description = '';
  skills: UiCourse[] = [];
  favorites: Post[] = [];
  myPosts: Post[] = [];
  myCourses: Course[] = [];
  isNewUser = true;

  constructor(token: string, firstName: string, lastName: string, email: string, isNewUser?: boolean) {
    this.firebaseToken = token;
    this.name = new Name(firstName, lastName);
    this.email = email;
    this.isNewUser = isNewUser;
  }
}
