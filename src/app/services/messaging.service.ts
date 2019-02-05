import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from './user.service';
import {Notification} from './answer.service';

@Injectable()
export class MessagingService {
  userId;
  messages = [];
  currentMessage = new BehaviorSubject(<any> '');
  constructor(
    private userService: UserService,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
    this.userService.getFirebaseUser().then(value => {
      this.userId = value.uid;
    });
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );
    this.receiveMessage();
  }

  /**
   * update token in firebase database
   *
   * @param userId userId as a key
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[this.userId] = token;
        this.angularFireDB.object('fcmTokens/').update(data);
      });
  }
  public getTheMessage(): Observable<any> {
    return this.currentMessage.asObservable();
  }
  /**
   * request permission for notification from firebase cloud messaging
   *
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // console.log(token);
        this.updateToken(this.userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        console.log('new message received. ', payload);
        this.currentMessage.next(payload.valueOf());
        const value = payload.valueOf();
            this.messages.push(new Notification(value.notification.title, value.data['gcm.notification.user'],
              JSON.parse(value.data['gcm.notification.relatedCourses']), value.data['gcm.notification.link']));
      });
  }
  resetMessage() {
    this.currentMessage.next('');
    this.messages = [];
  }
}

