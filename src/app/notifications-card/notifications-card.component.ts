import {Component, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
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

  notifications: Notification[];
  @Output() menuClosed = new EventEmitter();

  constructor(private messagingService: MessagingService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  updateNotifications() {
    const viewContainerRef = this.notificationsHost.viewContainerRef;
    viewContainerRef.clear();
    this.notifications = this.messagingService.notifications.slice();
    const factory = this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);
    this.notifications.forEach((notification) => {
      const notificationInstance: NotificationComponent =
        viewContainerRef.createComponent(factory).instance;
      notificationInstance.notification = notification;
    });
  }

  ngOnInit() {
    // this.menuTrigger.openMenu();
  }

  destroyComponent() {
    this.menuClosed.emit();
  }
}
