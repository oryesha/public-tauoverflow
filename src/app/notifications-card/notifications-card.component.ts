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
  @Output() menuClosed = new EventEmitter();

  constructor(private messagingService: MessagingService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  updateNotifications() {
    this.notificationsHost.viewContainerRef.clear();
    this.seenNotifications = this.messagingService.seenNotifications.slice();
    this.newNotifications = this.messagingService.newNotifications.slice();
    const factory = this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);
    this.newNotifications.forEach((notification) => this._addNotificationToCard(notification, factory));
  }

  private _addNotificationToCard(notification: Notification,
                                 factory: ComponentFactory<NotificationComponent>) {
    const notificationInstance: NotificationComponent =
      this.notificationsHost.viewContainerRef.createComponent(factory).instance;
    notificationInstance.notification = notification;
  }

  ngOnInit() {
    // this.menuTrigger.openMenu();
  }

  destroyComponent() {
    this.menuClosed.emit();
  }
}
