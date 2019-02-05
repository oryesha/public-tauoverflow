import {Component, ComponentFactoryResolver, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {MessagingService} from '../services/messaging.service';
import {MatButton, MatDialog, MatSnackBar} from '@angular/material';
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
export class NavBarComponent implements OnDestroy, OnInit  {
  @ViewChild('notificationsButton') notificationsButton: MatButton;
  @ViewChild('notificationsCard') notificationsCard: NotificationsCardComponent;

  constructor(private authService: AuthService,
              private router: Router,
              private routingDataService: AppRoutingDataService,
              private userService: UserService,
              private messagingService: MessagingService,
              private snackBar: MatSnackBar,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialog: MatDialog) { }

  messageSource = [];
  notifications;
  showNotifications: boolean;
  @Input() isSignUp: boolean;
  @Input() user: UserProfile;

  tmp = this.messagingService.getTheMessage().subscribe(value => {
    this.messageSource = this.messagingService.messages;
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
    this._openNotifications();
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '500px';
    // dialogConfig.data = {title: 'Notification information', notifications: this.messageSource};
    // this.dialog.open(NotificationDialogComponent, dialogConfig).afterClosed().subscribe(
    //   result => {
    //     this.messageSource = [];
    //     this.messagingService.resetMessage();
    //   });
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

  private _openNotifications() {
    // const factory = this.componentFactoryResolver.resolveComponentFactory(NotificationsCardComponent);
    // const viewContainerRef = this.notificationsCard.viewContainerRef;
    // viewContainerRef.clear();
    // viewContainerRef.createComponent(factory);
  }
}
