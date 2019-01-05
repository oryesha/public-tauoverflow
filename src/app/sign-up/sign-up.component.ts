import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import * as firebase from 'firebase';


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

  // programFormControl = new FormControl('', [Validators.required]);
  signUpForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
    // program: new FormControl('', [this.autocompleteValidator()])
  });
  hidePassword = true;

  // autocompleteValidator(): ValidatorFn {
  //   debugger;
  //   const signUpComponent = this;
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const illegal = {'illegalOption': false};
  //     if (signUpComponent && signUpComponent.autocomplete) {
  //       return signUpComponent.autocomplete.valid(control.value) ? null : illegal;
  //     }
  //     return illegal;
  //   };
  // }

  programs: string[] = ['Computer Science', 'Electrical Engineering', 'Law', 'Computer Science and Electrical Engineering', 'Economics',
    'Management', 'Physics', 'Chemistry'];
  private successMessage: string;
  private errorMessage: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private routingDataService: AppRoutingDataService,
    private formBuilder: FormBuilder
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
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  ngOnInit() {
  }

  private _enterApp(response: firebase.auth.UserCredential, value?: any) {
    const user = this._createUser(response, value);
    if (user.isNewUser) {
      this._subscribeUser(user);
    }
    this._navigateToHomePage(user);
  }

  private _subscribeUser(user: UserProfile) {
    this.userService.subscribeNewUser(user).subscribe(() => {
    });
  }

  private _navigateToHomePage(user: UserProfile) {
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
