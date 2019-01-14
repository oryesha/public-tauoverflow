import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {MessagingService} from '../services/messaging.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router,
              private messagingService: MessagingService,
              private dialog: MatDialog) { }
  messageSource = [];
  notifications;
  @Input() isSignUp: boolean;
  tmp = this.messagingService.getTheMessage().subscribe(value => {
    if (value !== '') {
      console.log('Value is');
      console.log(value.notification);
      this.messageSource.push(value.notification);
    }
  });
  ngOnInit() {
  }
  logout() {
    this.authService.doLogout().then( () => this.router.navigate(['']));
  }
  resetNotification() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Notification information', notifications: this.messageSource};
    this.dialog.open(NotificationDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        this.messageSource = [];
        this.messagingService.resetMessage();
      });
  }
}
