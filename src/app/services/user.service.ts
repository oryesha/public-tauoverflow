import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {UserProfile} from '../models/user-profile.model';
import {HttpRequestsService} from './http-requests.service';
import {Observable} from 'rxjs';
import {Question} from '../models/question.model';
import {NotificationSettings} from '../models/notification-settings.model';
import {MessagingService} from './messaging.service';

@Injectable()
export class UserService {
  private _currentUser: UserProfile;
  private _getOfflineNotifications = true;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private messagingService: MessagingService,
    private httpRequest: HttpRequestsService
  ) {}

  getCurrentUserId(): string {
    return this._currentUser.firebaseToken;
  }

  getFirebaseUser() {
    return new Promise<any>((resolve) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          // this.httpRequest
          resolve(user);
        } else {
          resolve(null);
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
      this.messagingService.registerUser(this._currentUser);
    });
    return res;
  }

  updateUserDetails(user: UserProfile): Observable<any> {
    return this.httpRequest.put('/user', user);
  }

  updateFavorites(user: UserProfile, question: Question): Observable<any> {
    return this.httpRequest.put('/user/update-favorite',
      {userId: user.id, questionId: question.id});
  }

  updateMyCourses(user: UserProfile, courseId: string): Observable<any> {
    return this.httpRequest.put(
      '/user/update-my-courses',
      {userId: user.id, courseId: courseId});
  }

  addToMyCourses(user: UserProfile, courseIds: string[]): Observable<any> {
    return this.httpRequest.put('/user/add-to-my-courses',
      {userId: user.id, courseIds: courseIds});
  }

  removeFromMyCourses(user: UserProfile, courseId: string): Observable<any> {
    return this.httpRequest.put('/user/remove-from-my-courses',
      {userId: user.id, courseId: courseId});
  }

  getUser(fromServer = false): Promise<UserProfile> {
    if (this._currentUser && !fromServer) {
      return Promise.resolve(this._currentUser);
    }
    return new Promise<any>(resolve => {
      this.getFirebaseUser().then((res: firebase.User) => {
        if (!res) {
          return null;
        }
        this.httpRequest.get('/user', [], [res.uid]).subscribe(user => {
          this._currentUser = UserProfile.deserialize(user);
          if (this._getOfflineNotifications) {
            this.messagingService.getOfflineNotifications(this._currentUser);
            this._getOfflineNotifications = false;
          }
          resolve(this._currentUser);
        });
      });
    });
  }

  setCurrentUser(user: UserProfile) {
    this._currentUser = user;
  }

  updateNotificationSettings(newSettings: NotificationSettings) {
    this._currentUser.notificationSettings = newSettings;
    const userId = this._currentUser.id;
    return this.httpRequest.put('/user/update-notification-settings',
      {userId, newSettings});
  }

  unregisterFromNotifications() {
    this._currentUser.isLoggedIn = false;
    this.updateUserDetails(this._currentUser).subscribe(() => {
      this._getOfflineNotifications = true;
      this.messagingService.unregisterUser();
    });
  }
}
