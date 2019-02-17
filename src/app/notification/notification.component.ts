import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../models/notification.model';
import {MessagingService} from '../services/messaging.service';
import {Router} from '@angular/router';

enum TimeUnit {
  SECONDS, MINUTES, HOURS, DAYS
}

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notification: Notification;
  @Input() isNew: boolean;

  constructor(private messagingService: MessagingService,
              private router: Router) { }

  ngOnInit() {
  }

  // delete notification from db + client and go to referenced question
  goToQuestion() {
    // delete notification
    this.messagingService.deleteNotification(this.notification);
    const origUrl = this.router.url;
    const id = this.notification.questionId;
    this.router.navigate(['question-page'], {queryParams: {id: id}})
      .then(() => {
        if (origUrl.includes('question-page?id=' + id)) {
          location.reload(); // get new answers
        }
      });
  }

  getElapsedTime(): string {
    const oneDay = 24 * 60 * 60 * 1000;
    const elapsed = new Date(Date.now() - this.notification.timestamp.getTime());
    let value = Math.floor(elapsed.getTime() / oneDay);
    if (value >= 1) {
      return this._timeUnit(value, TimeUnit.DAYS);
    }
    const oneHour = 60 * 60 * 1000;
    value = Math.floor(elapsed.getTime() / oneHour);
    if (value >= 1) {
      return this._timeUnit(value, TimeUnit.HOURS);
    }
    const oneMin = 60 * 1000;
    value = Math.floor(elapsed.getTime() / oneMin);
    if (value >= 1) {
      return this._timeUnit(value, TimeUnit.MINUTES);
    }
    return this._timeUnit(Math.ceil(elapsed.getTime() / 1000), TimeUnit.SECONDS);
  }

  private _timeUnit(value: number, timeUnit: TimeUnit) {
    return value + ' ' + this._getTimeUnitString(value, timeUnit);
  }

  private _getTimeUnitString(value: number, timeUnit: TimeUnit) {
    const suffix = value === 1 ? '' : 's';
    switch (timeUnit) {
      case TimeUnit.SECONDS:
        return 'second' + suffix;
      case TimeUnit.MINUTES:
        return 'minute' + suffix;
      case TimeUnit.HOURS:
        return 'hour' + suffix;
      case TimeUnit.DAYS:
        return 'day' + suffix;
    }
  }
}
