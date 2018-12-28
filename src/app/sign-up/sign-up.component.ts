import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import {Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AutocompleteComponent} from '../autocomplete/autocomplete.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // @ViewChild('autocomplete') autocomplete: AutocompleteComponent;

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
    private formBuilder: FormBuilder
  ) { }

  tryGoogleLogin() {
    this.authService.doGoogleLogin().then(response => {
        // debugger;
        this.router.navigate(['home-page']);
      }, () => {}
    );
  }

  tryRegister(value) {
    debugger;
    this.authService.doRegister(value)
      .then(res => {
        console.log(res);
        this.errorMessage = '';
        this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
  }

  ngOnInit() {
  }
  //
  // setDummyInput(selected: string) {
  //   this.autocompleteInput.nativeElement.value = selected;
  //   this.programFormControl.setValue(selected);
  // }

}
