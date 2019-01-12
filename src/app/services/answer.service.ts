import {Answer} from '../models/answer.model';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequestsService} from './http-requests.service';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';

export class Notification {
  title: string;
  body: string;
  click_action: string;
  constructor(title, body, click_action) {
    this.title = title;
    this.body = body;
    this.click_action = click_action;
  }
}

export class NotificationWrapper {
  notification: Notification;
  to: string;
  constructor(notification, to) {
    this.notification = notification;
    this.to = to;
  }
}

@Injectable()
export class AnswerService {

  constructor(
    private httpRequest: HttpRequestsService,
    private http: HttpClient,
    private angularFireDB: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private angularFireMessaging: AngularFireMessaging) {
  }

  createAnswer(answer: Answer): Observable<any> {
    return this.httpRequest.post('/answers', answer);
  }

  getAnswer(id: string): Observable<any> {
    return this.httpRequest.get('/answers', [], [id]);
  }

  notifyAnswer(firebaseToken: string) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    this.angularFireDB.object('/fcmTokens/').valueChanges()
      .subscribe((list) => {
        const questionOwnerToken = list[firebaseToken];
        console.log('in answers');
        console.log(questionOwnerToken);
        const headers = new HttpHeaders().set('Authorization', 'key=AAAAc9A8WeQ:APA91bEs459-ePMYaPJjllo7HtqDguA2Og' +
          '-vTkrSZM8BvDTxYfBmZ3iBhs6G5MXLQfisQQzOckxyHQZv8-MQ_D5QURI9C_xo4-NMsAQkLQBn5P7FiWD2-BAQsznVrfZ-A20ewuvBIAHk');
        const notification = new Notification('You Have An Answer !', '!', 'https://dummypage.com');
        const data = new NotificationWrapper(notification, questionOwnerToken);
        this.http.post(url, data, {headers: headers}).subscribe((res: any) => {
          console.log(res);
        });
      });
  }
}
