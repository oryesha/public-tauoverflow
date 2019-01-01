import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserProfile} from '../models/user-profile.model';
import {HttpRequestsService} from './http-requests.service';
import {Observable} from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private httpRequest: HttpRequestsService
  ) {}

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  subscribeNewUser(user: UserProfile): Observable<any> {
    console.log('subscribe new user');
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
}