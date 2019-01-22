import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserProfile} from '../models/user-profile.model';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {Question} from '../models/question.model';

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
      user.id = response.data._id;
    });
    return res;
  }

  updateUserDetails(user: UserProfile): Observable<any> {
    console.log('update user');
    return this.httpRequest.put('/user', user);
  }

  updateFavorites(user: UserProfile, question: Question): Observable<any> {
    return this.httpRequest.put('/user/update-favorite',
      {userId: user.id, questionId: question.id});
  }

  getUser(fromServer = false): Promise<UserProfile> {
    if (this._currentUser && !fromServer) {
      return Promise.resolve(this._currentUser);
    }
    return new Promise<any>(resolve => {
      this.getFirebaseUser().then((res: firebase.User) => {
        this.httpRequest.get('/user', [], [res.uid]).subscribe(user => {
          this._currentUser = UserProfile.deserialize(user);
          resolve(this._currentUser);
        });
      });
    });
  }

  setCurrentUser(user: UserProfile) {
    this._currentUser = user;
  }
}
