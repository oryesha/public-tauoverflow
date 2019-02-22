import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {MessagingService} from '../services/messaging.service';
import {MatButton, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationsCardComponent} from '../notifications-card/notifications-card.component';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit  {
  @ViewChild('notificationsButton') notificationsButton: MatButton;
  @ViewChild('notificationsCard') notificationsCard: NotificationsCardComponent;

  constructor(private authService: AuthService,
              private router: Router,
              private routingDataService: AppRoutingDataService,
              private userService: UserService,
              private messagingService: MessagingService,
              private snackBar: MatSnackBar) { }
  seenNotifications = this.messagingService.seenNotifications;
  newNotifications = this.messagingService.newNotifications;
  @Input() isSignUp: boolean;
  @Input() user: UserProfile;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  @Output() loginAttempt = new EventEmitter();

  ngOnInit() {
  }

  logout() {
    this.authService.doLogout().then( () => {
      this.router.navigate(['']);
    });
  }

  resetNotification() {
    this.notificationsCard.updateNotifications();
    const justSeenNotification = this.newNotifications.splice(0, this.newNotifications.length);
    this.messagingService.markNotificationsAsSeen(justSeenNotification);
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
