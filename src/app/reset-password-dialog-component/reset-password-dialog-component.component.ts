import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-reset-password-dialog-component',
  templateUrl: './reset-password-dialog-component.component.html',
  styleUrls: ['./reset-password-dialog-component.component.scss']
})
export class ResetPasswordDialogComponentComponent implements OnInit {
  email: string;

  constructor(private dialogRef: MatDialogRef<ResetPasswordDialogComponentComponent>) { }

  ngOnInit() {
  }

  sendMail() {
    if (this.email) {
      firebase.auth().sendPasswordResetEmail(this.email).then(() => {
        this.dialogRef.close(true);
      }).catch((error) => {
        this.dialogRef.close(false);
      });
    }
  }
}
