import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireMessaging } from 'angularfire2/messaging';
import { take } from 'rxjs/operators';
import {Notification} from '../models/notification.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HttpRequestsService} from './http-requests.service';
import {UserProfile} from '../models/user-profile.model';

@Injectable()
export class MessagingService {
  user: UserProfile;
  seenNotifications: Notification[] = [];
  newNotifications: Notification[] = [];
  constructor(
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private http: HttpClient,
    private httpRequest: HttpRequestsService,
    private angularFireMessaging: AngularFireMessaging) {
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
   * Register user to notification service.
   * @param user
   */
  registerUser(user: UserProfile) {
    this.user = user;
    this.requestPermission();
  }

  getOfflineNotifications(user: UserProfile) {
    this.user = user;
    this.requestPermission();
    this.httpRequest.get('/notifications', [], [this.user.firebaseToken]).subscribe((res) => {
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
  }

  /**
   * update token in firebase database
   *
   * @param token token as a value
   */
  updateToken(token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[this.user.firebaseToken] = token;
        this.angularFireDB.object('fcmTokens/').update(data);
      });
  }

  /**
   * request permission for notification from firebase cloud messaging
   */
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        // console.log(token);
        this.updateToken(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  deleteNotification(notification: Notification) {
    this.httpRequest.delete('/notifications', notification.id).subscribe((response: any) => {
      let index = this.newNotifications.indexOf(notification);
      if (index > -1) {
        this.newNotifications.splice(index, 1);
      } else { // already seen
        index = this.seenNotifications.indexOf(notification);
        if (index > -1) {
          this.seenNotifications.splice(index, 1);
        }
      }
    });
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: any) => {
        const value = payload.valueOf();
        const receivedNotification =
            new Notification(
                value.data['gcm.notification.subject'],
                value.data['gcm.notification.owner'],
                JSON.parse(value.data['gcm.notification.isSeen']),
                JSON.parse(value.data['gcm.notification.isAnswer']),
                value.data['gcm.notification.questionId'],
                value.data['gcm.notification.id'],
                new Date(value.data['gcm.notification.timestamp']));

        this.newNotifications.push(receivedNotification);
      });
  }

  resetMessage() {
    // this.currentMessage.
    // this.messages = [];
  }

  markNotificationsAsSeen(justSeenNotification: Notification[]) {
    justSeenNotification.forEach((notification) => {
      notification.isSeen = true;
      this.httpRequest.put('/notifications', notification).subscribe(res => {
        console.log('Update Succesful');
      }, err => {
        console.error('Update Unsuccessful: ' + err);
      });
      this.seenNotifications.push(notification);
    });
  }

  sendMessage(receiverFbToken: string, senderFbToken: string, questionName: string, senderName: string, questionId: string,
              isSenderAnswered: boolean) {
    // avoid self notifications
    if (receiverFbToken === senderFbToken) {
      return;
    }
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
          // send notification to user
          const data = notification.getNotificationWrapper(questionOwnerToken);
          this.http.post(url, data, {headers: headers}).subscribe();
        });
      });
  }

  unregisterUser() {
    this.seenNotifications.splice(0, this.seenNotifications.length);
    this.newNotifications.splice(0, this.newNotifications.length);
    this.user = null;
  }
}

