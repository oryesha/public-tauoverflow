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
  image = ''; // TODO(nati): Decide how this should look.
  asked = 0;
  answered = 0;
  description = '';
  skills: UiCourse[] = [];
  favorites: Post[] = [];
  myPosts: Post[] = [];
  myCourses: Course[] = [];
  isNewUser = true;

  static deserialize(user: any): UserProfile {
    return new UserProfile(user.firebaseToken, user.firstName, user.lastName, user.email,
      false, user._id, user.program, user.rank, user.image, user.asked, user.answered, user.description);
  }

  constructor(token: string, firstName: string, lastName: string,
              email: string, isNewUser?: boolean, id?: string, program?: string,
              rank?: number, image?: string, asked?: number, answered?: number,
              description?: string) {
    this.firebaseToken = token;
    this.name = new Name(firstName, lastName);
    this.email = email;
    this.isNewUser = isNewUser;
    if (id) {
      this.id = id;
      this.program = program;
      this.rank = rank;
      this.image = image;
      this.description = description;
      this.asked = asked;
      this.answered = answered;
    }
  }
}
