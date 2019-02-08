import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../models/notification.model';
import {MessagingService} from '../services/messaging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;

  constructor(private messagingService: MessagingService,
              private router: Router) { }

  ngOnInit() {
  }

  // delete notification from db + client and go to referenced question
  goToQuestion() {
    // delete notification
    this.messagingService.deleteNotification(this.notification);
    this.router.navigate(['question-page'], {queryParams: {id: this.notification.questionId}});
  }
}
