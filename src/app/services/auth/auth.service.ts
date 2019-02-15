import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserService} from '../user.service';

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private userService: UserService
  ) {}

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
    });
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      this.userService.getFirebaseUser().then(() => {
        this.userService.unregisterFromNotifications();
        this.afAuth.auth.signOut().then(() => resolve(null));
      }, () => {
        this.userService.unregisterFromNotifications();
        this.afAuth.auth.signOut().then(() => resolve(null));
      });
    });
  }
}
