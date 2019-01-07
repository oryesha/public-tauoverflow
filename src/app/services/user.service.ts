import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserProfile} from '../models/user-profile.model';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

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
    const res = this.httpRequest.post('/user', user);
    res.subscribe((response: any) => {
      user.id = response.data.id;
    });
    return res;
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
  getUser(): Promise<any> {
    debugger;
    if (this._currentUser) {
      return Promise.resolve(this._currentUser);
    }
    return new Promise<any>(resolve => {
      this.getFirebaseUser().then((res: firebase.User) => {
        this.httpRequest.get('/user', [], [res.uid]).subscribe(user => {
          // debugger;
          this._currentUser = user;
          resolve(user);
        });
      });
    });
  }

  setCurrentUser(user: UserProfile) {
    this._currentUser = user;
  }
}
