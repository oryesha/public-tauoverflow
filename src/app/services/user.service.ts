import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {}

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("succeded");
          resolve(user);
        } else {
          console.log("failed");
          reject('No user logged in');
        }
      });
    });
  }

  // updateCurrentUser(value) {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().currentUser;
  //     user.updateProfile({
  //       displayName: value.name,
  //       photoURL: user.photoURL
  //     }).then(res => {
  //       resolve(res);
  //     }, err => reject(err));
  //   });
  // }
}
