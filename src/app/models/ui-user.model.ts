import {Name} from './name.model';
import {UiCourse} from './ui-course.model';

export class UiUser {
  id: string;
  firebaseToken: string;
  name: Name;
  email: string;
  image = '';
  rank = 0;
  description = '';
  skills: UiCourse[] = [];
  program = '';

  static deserialize(user: any): UiUser {
    return new UiUser(user.firstName, user.lastName, user.firebaseToken, user.email, user._id, user.image, user.program,
        user.rank, user.description, user.skills);
  }

  constructor(firstName: string, lastName: string, firebaseToken: string,
              email: string, id?: string, image?: string, program?: string, rank?: number,
              description?: string, skills?: UiCourse[]) {
    this.name = new Name(firstName, lastName);
    this.firebaseToken = firebaseToken;
    this.email = email;
    this.id = id;
    this.program = program;
    this.image = image;
    this.rank = rank;
    this.description = description;
    this.skills = skills;
  }
}
