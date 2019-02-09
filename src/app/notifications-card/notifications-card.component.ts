import {Component, ComponentFactory, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatMenu} from '@angular/material';
import {MessagingService} from '../services/messaging.service';
import {Notification} from '../models/notification.model';
import {NotificationHostDirective} from './notification-host.directive';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-notifications-card',
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.scss']
})
export class NotificationsCardComponent implements OnInit {
  @ViewChild('notificationsMenu') notificationsMenu: MatMenu;
  @ViewChild(NotificationHostDirective) notificationsHost: NotificationHostDirective;

  newNotifications: Notification[];
  seenNotifications: Notification[];
  notificationComponentFactory: ComponentFactory<NotificationComponent>;

  constructor(private messagingService: MessagingService,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.notificationComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);
  }

  updateNotifications() {
    this.notificationsHost.viewContainerRef.clear();
    this.newNotifications = this.messagingService.newNotifications.slice();
    this.seenNotifications = this.messagingService.seenNotifications.slice();
    this.newNotifications.forEach((notification) => this._addNotificationToCard(notification));
    this.seenNotifications.forEach((notification) => this._addNotificationToCard(notification));
  }

  private _addNotificationToCard(notification: Notification) {
    const notificationInstance: NotificationComponent =
        this.notificationsHost
            .viewContainerRef
            .createComponent(this.notificationComponentFactory).instance;
    notificationInstance.notification = notification;
    notificationInstance.isNew = !notification.isSeen;
  }

  ngOnInit() {
  }
}
