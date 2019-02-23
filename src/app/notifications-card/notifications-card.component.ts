import {Component, ComponentFactory, ComponentFactoryResolver, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatMenu} from '@angular/material';
import {MessagingService} from '../services/messaging.service';
import {Notification} from '../models/notification.model';
import {NotificationHostDirective} from './notification-host.directive';
import {NotificationComponent} from '../notification/notification.component';
import {UserService} from '../services/user.service';
import {NotificationSettingsDialogComponent} from '../notification-settings-dialog/notification-settings-dialog.component';

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
              private userService: UserService,
              private dialog: MatDialog,
              private componentFactoryResolver: ComponentFactoryResolver) {
    this.notificationComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);
  }

  updateNotifications() {
    this.notificationsHost.viewContainerRef.clear();
    this.newNotifications = this.messagingService.newNotifications.slice().sort(
      (n1, n2) => n2.timestamp.getTime() - n1.timestamp.getTime());
    this.seenNotifications = this.messagingService.seenNotifications.slice().sort(
      (n1, n2) => n2.timestamp.getTime() - n1.timestamp.getTime()
    );
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

  async openNotificationSettingsDialog() {
    const user = await this.userService.getUser();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      id: 1,
      title: 'Notification Settings',
      notificationSettings: user.notificationSettings,
    };
    this.dialog.open(NotificationSettingsDialogComponent, dialogConfig);
  }
}
