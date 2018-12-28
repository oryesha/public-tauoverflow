import {Post} from './post.model';
import {Course} from './course.model';
import {Name} from './name.model';

export class UserProfile {
  _id: string;
  name: Name;
  program: string;
  email: string;
  rank: number;
  image: string;
  asked: number;
  answered: number;
  description: string;
  skills: Course[];
  favorites: Post[];
  myPosts: Post[];
  myCourses: Course[];

  constructor(id: string, firstName: string, lastName: string, program: string, email: string, rank: number,
              image: string, asked: number, answered: number, description: string, skills: Course[],
              favorites: Post[], myPosts: Post[], myCourses: Course[]) {
    this._id = id;
    this.name = new Name(firstName, lastName);
    this.program = program;
    this.email = email;
    this.rank = rank;
    this.image = image;
    this.asked = asked;
    this.answered = answered;
    this.description = description;
    this.skills = skills;
    this.favorites = favorites;
    this.myPosts = myPosts;
    this.myCourses = myCourses;
  }
}
