import {Name} from './name.model';

export class UiUser {
  id: string;
  firebaseToken: string;
  name: Name;
  email: string;
  image = ''; // TODO(nati): Decide how this should look.

  static deserialize(user: any): UiUser {
    return new UiUser(user.firstName, user.lastName, user.firebaseToken, user.email, user._id, user.image);
  }

  constructor(firstName: string, lastName: string, firebaseToken: string,
              email: string, id?: string, image?: string) {
    this.name = new Name(firstName, lastName);
    this.firebaseToken = firebaseToken;
    this.email = email;
    this.id = id;
    this.image = image;
  }
}
