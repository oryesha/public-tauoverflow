
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {MessagingService} from '../services/messaging.service';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {NotificationDialogComponent} from '../notification-dialog/notification-dialog.component';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Notification} from '../models/notification.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnDestroy, OnInit  {

  constructor(private authService: AuthService,
              private router: Router,
              private routingDataService: AppRoutingDataService,
              private userService: UserService,
              private messagingService: MessagingService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }
  seenNotifications = this.messagingService.seenNotifications;
  newNotifications = this.messagingService.newNotifications;
  @Input() isSignUp: boolean;
  @Input() user: UserProfile;

  tmp = this.messagingService.getTheMessage().subscribe((newMessage) => {
    this.newNotifications.push(newMessage);
  });
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  @Output() loginAttempt = new EventEmitter();


  ngOnInit() {
  }
  ngOnDestroy() {
    this.tmp.unsubscribe();
  }
  logout() {
    this.authService.doLogout().then( () => this.router.navigate(['']));
  }

  resetNotification() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Notification information', newNotifications: this.newNotifications,
    seenNotification: this.seenNotifications};
    // this.dialog.open(NotificationDialogComponent, dialogConfig).afterClosed().subscribe(
    //   (result) => {
    //     this.seenNotifications = this.seenNotifications.concat(this.newNotifications);
    //     this.newNotifications = [];
    //     // this.messagingService.resetMessage();
    //   });
    this.dialog.open(NotificationDialogComponent, dialogConfig);
  }

  navigateToPage(page) {
    this.userService.getUser(true).then((user) => {
      this.router.navigate([page], {queryParams: {id: user.firebaseToken}});
    });
  }

  login() {
    if (!this.loginForm.valid) {
      this.snackBar.open('Please enter valid credentials', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
      return;
    }
    this.loginAttempt.emit(this.loginForm.value);
  }
}
