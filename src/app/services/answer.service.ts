import {Answer} from '../models/answer.model';
import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpRequestsService} from './http-requests.service';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import {UserProfile} from '../models/user-profile.model';
import {UiCourse} from '../models/ui-course.model';
import {Notification} from '../models/notification.model';

// export class Message {
//   title: string;
//   user: string;
//   // relatedCourses: UiCourse[];
//   link: string;
//   constructor(title, user, link) {
//     this.title = title;
//     this.link = link;
//     this.user = user;
//     // this.relatedCourses = relatedCourses;
//   }
// }
//
// export class MessageWrapper {
//   message: Message;
//   to: string;
//   constructor(message, to) {
//     this.message = message;
//     this.to = to;
//   }
// }

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

  updateAnswer(answer: Answer): Observable<any> {
    console.log('update answer');
    return this.httpRequest.put('/answers', answer);
  }
  getAnswer(id: string): Observable<any> {
    return this.httpRequest.get('/answers', [], [id]);
  }

  // notifyAnswer(firebaseToken: string, questionName: string, userName: string, relatedCourses: UiCourse[] , questionPath: string) {
  //   const url = 'https://fcm.googleapis.com/fcm/send';
  //   this.angularFireDB.object('/fcmTokens/').valueChanges()
  //     .subscribe((list) => {
  //       const questionOwnerToken = list[firebaseToken];
  //       const headers = new HttpHeaders().set('Authorization', 'key=AAAAc9A8WeQ:APA91bEs459-ePMYaPJjllo7HtqDguA2Og' +
  //         '-vTkrSZM8BvDTxYfBmZ3iBhs6G5MXLQfisQQzOckxyHQZv8-MQ_D5QURI9C_xo4-NMsAQkLQBn5P7FiWD2-BAQsznVrfZ-A20ewuvBIAHk');
  //       const message = new Message(questionName , userName, questionPath);
  //       const data = new MessageWrapper(message, questionOwnerToken);
  //       // send notification to user
  //       this.http.post(url, data, {headers: headers}).subscribe((res: any) => {
  //         // console.log(res);
  //       });
  //       // add notification to db
  //       const notification = new Notification(questionName, userName, null, true, questionPath);
  //       const path = ('notifications/' + firebaseToken);
  //       this.httpRequest.post(path, notification);
  //     });
  // }
}
