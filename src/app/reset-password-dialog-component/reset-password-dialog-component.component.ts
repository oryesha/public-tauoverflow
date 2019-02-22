import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password-dialog-component',
  templateUrl: './reset-password-dialog-component.component.html',
  styleUrls: ['./reset-password-dialog-component.component.scss']
})
export class ResetPasswordDialogComponentComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ResetPasswordDialogComponentComponent>) { }

  EmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit() {
  }

  sendEmail(value) {
    if (value.email) {
      firebase.auth().sendPasswordResetEmail(value.email).then(() => {
        this.dialogRef.close(true);
      }).catch((error) => {
        this.dialogRef.close(false);
      });
    }
  }
}
