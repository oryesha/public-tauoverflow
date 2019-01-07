import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserProfile} from '../models/user-profile.model';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {
  private _currentUser: UserProfile;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private httpRequest: HttpRequestsService
  ) {}

  getCurrentUserId(): string {
    return this._currentUser.firebaseToken;
  }

  getFirebaseUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          // this.httpRequest
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  subscribeNewUser(user: UserProfile): Observable<any> {
    console.log('subscribe new user');
    this._currentUser = user;
    return this.httpRequest.post('/user', user);
  }

  updateUserDetails(user: UserProfile): Observable<any> {
    console.log('update user');
    return this.httpRequest.put('/user', user);
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
  getUser(): Promise<Observable<any>> {
    return this.getFirebaseUser().then((res: firebase.User) => {
      return this.httpRequest.get('/user', [], [res.uid]);
    });
  }

  setCurrentUser(user: UserProfile) {
    this._currentUser = user;
  }
}
