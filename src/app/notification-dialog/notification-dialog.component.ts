import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatButton} from '@angular/material';
import {Notification} from '../models/notification.model';
import {MessagingService} from '../services/messaging.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.scss']
})
export class NotificationDialogComponent implements OnInit {
  title: string;
  newNotifications: Notification[] = [];
  seenNotifications: Notification[] = [];
  constructor(
    private dialogRef: MatDialogRef<NotificationDialogComponent>,
    private messagingService: MessagingService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.newNotifications = data.newNotifications;
    this.seenNotifications = data.seenNotifications;
  }
  ngOnInit() {
  }



}
