import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { take } from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from './user.service';
import {Notification} from '../models/notification.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpRequestsService} from './http-requests.service';

@Injectable()
export class MessagingService {
  userId;
  // messages = [];
  seenNotifications: Notification[] = [];
  newNotifications: Notification[] = [];
  currentMessage = new BehaviorSubject(<any> '');
  constructor(
    private userService: UserService,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private http: HttpClient,
    private httpRequest: HttpRequestsService,
    private angularFireMessaging: AngularFireMessaging) {
    this.userService.getFirebaseUser().then(value => {
      this.userId = value.uid;
      this.requestPermission();
      // get offline notifications
      this.httpRequest.get('/notifications', [], [this.userId]).subscribe((res) => {
        if (res) {
          res.forEach((notification) => {
            if (notification.isSeen) {
              this.seenNotifications.push(Notification.deserialize(notification));
            } else {
              this.newNotifications.push(Notification.deserialize(notification));
            }
          });
        }
      });
    });
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    );
    // hook message receiver
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
   */
  requestPermission() {
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

  deleteNotification(id) {
    this.httpRequest.delete('/notifications', id).subscribe((response: any) => {
      this.newNotifications.forEach((notification) => {
        notification.isSeen = true;
        this.seenNotifications.push(notification);
      });
      this.newNotifications = [];
    });
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        // console.log('new message received. ', payload);
        this.currentMessage.next(payload.valueOf());
        const value = payload.valueOf();
        // this.messages.push(new Message(value.notification.title, value.data['gcm.notification.user'],
        //   JSON.parse(value.data['gcm.notification.relatedCourses']), value.data['gcm.notification.link']));
        this.newNotifications.push(new Notification(value.data['gcm.notification.subject'],
          value.data['gcm.notification.owner'], JSON.parse(value.data['gcm.notification.isSeen']),
          JSON.parse(value.data['gcm.notification.isAnswer']), value.data['gcm.notification.link'],
          value.data['gcm.notification.id'], new Date(value.data['gcm.notification.timestamp'])));
      });
  }

  resetMessage() {
    this.currentMessage.next('');
    // this.messages = [];
  }

  sendMessage(receiverFbToken: string, questionName: string, senderName: string, questionId: string,
              isSenderAnswered: boolean) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    this.angularFireDB.object('/fcmTokens/').valueChanges()
      .subscribe((list) => {
        const questionOwnerToken = list[receiverFbToken];
        const headers = new HttpHeaders().set('Authorization', 'key=AAAAc9A8WeQ:APA91bEs459-ePMYaPJjllo7HtqDguA2Og' +
          '-vTkrSZM8BvDTxYfBmZ3iBhs6G5MXLQfisQQzOckxyHQZv8-MQ_D5QURI9C_xo4-NMsAQkLQBn5P7FiWD2-BAQsznVrfZ-A20ewuvBIAHk');
        const notification = new Notification(questionName, senderName, false, isSenderAnswered, questionId);
        // add notification to db
        const path = ('/notifications/' + receiverFbToken);
        this.httpRequest.post(path, notification).subscribe((response: any) => {
          notification.id = response.data._id;
        });
        // send notification to user
        const data = notification.getNotificationWrapper(questionOwnerToken);
        this.http.post(url, data, {headers: headers}).subscribe();
      });
  }
}

