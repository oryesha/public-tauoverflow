import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSlideToggle} from '@angular/material';
import {NotificationSettings} from '../models/notification-settings.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-notification-settings-dialog',
  templateUrl: './notification-settings-dialog.component.html',
  styleUrls: ['./notification-settings-dialog.component.scss']
})
export class NotificationSettingsDialogComponent implements OnInit {
  @ViewChild(MatSlideToggle) slideToggle: MatSlideToggle;
  public MY_QUESTIONS;
  public MY_FAVORITES;
  public MY_COURSES;
  public MY_SKILLS;
  public title: string;
  public readonly notificationSettings: NotificationSettings;
  public newSettings: NotificationSettings;

  constructor(private dialogRef: MatDialogRef<NotificationSettingsDialogComponent>,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.notificationSettings = data.notificationSettings;
    this.newSettings = this.notificationSettings.clone();
  }

  ngOnInit() {
  }

  checkSlidersAndSubmit() {
    if (!this.notificationSettings.equals(this.newSettings)) {
      this.userService.updateNotificationSettings(this.newSettings).subscribe(() => {});
    }
    this.dialogRef.close();
  }
}
