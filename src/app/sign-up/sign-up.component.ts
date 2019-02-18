import {Component, OnInit} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import * as firebase from 'firebase';
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  static NewUser = class implements RoutingData<UserProfile> {
    constructor(private user: UserProfile) {}

    getData(): UserProfile {
      return this.user;
    }
  };

  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });
  hidePassword = true;

  private successMessage: string;
  private errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private routingDataService: AppRoutingDataService
  ) { }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(
      response => {
        this._enterApp(response);
      }, () => {}
    );
  }

  tryRegister(value) {
    this.authService.doRegister(value)
      .then(response => {
        console.log(response);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
        this._enterApp(response, value);
      }, err => {
        console.error(err);
        let message;
        const errCode: string = err.code;
        if (errCode.includes('email-already-in-use')) {
          message = 'Email already in use!';
        }
        if (errCode.includes('invalid-email')) {
          message = 'Invalid Email!';
        }
        if (errCode.includes('weak-password')) {
          message = 'Password should be at least 6 characters!';
        }
        this._promptToast(message);
      });
  }

  private _promptToast(msg?: string) {
    const message = msg ? msg : 'Something went wrong, please try again';
    this.snackBar.open(message, '', {
      duration: 2000 // Prompt the toast 2 seconds.
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(
        (res) => {
          this._enterApp(res, value);
        },
        (err) => {
          let message;
          const errCode: string = err.code;
          if (errCode.includes('wrong-password')) {
            message = 'Wrong password!';
          } else if (errCode.includes('user-not-found')) {
            message = 'Wrong email!';
          }
          this._promptToast(message);
        });
  }

  ngOnInit() {
  }

  private _enterApp(response: firebase.auth.UserCredential, value?: any) {
    if (response.additionalUserInfo.isNewUser) {
      const user = this._createUser(response, value);
      this._subscribeUser(user);
      this._navigateToHomePage(user);
    } else {
      this.userService.getUser(true).then((user: UserProfile) => {
        this._navigateToHomePage(user);
      });
    }
  }

  private _subscribeUser(user: UserProfile) {
    this.userService.subscribeNewUser(user);
  }

  private _navigateToHomePage(user: UserProfile) {
    this.userService.setCurrentUser(user);
    const newUser = new SignUpComponent.NewUser(user);
    this.routingDataService.setRoutingData('user', newUser);
    this.router.navigate(['home-page']);
  }

  private _createUser(response: firebase.auth.UserCredential, value?: any): UserProfile {
    let firstName: string, lastName = '';
    if (value) {
      firstName = value.firstName;
      lastName = value.lastName;
    } else {
      const displayName = response.user.displayName.split(' ');
      firstName = displayName[0];
      if (displayName.length > 1) {
        lastName = displayName.slice(1).join(' ');
      }
    }
    return new UserProfile(
      response.user.uid,
      firstName,
      lastName,
      response.user.email,
      response.additionalUserInfo.isNewUser);
  }
}
