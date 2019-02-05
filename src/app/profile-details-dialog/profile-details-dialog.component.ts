import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserProfile} from '../models/user-profile.model';

@Component({
  selector: 'app-profile-details-dialog',
  templateUrl: './profile-details-dialog.component.html',
  styleUrls: ['./profile-details-dialog.component.scss']
})
export class ProfileDetailsDialogComponent implements OnInit {
  user: UserProfile;

  constructor(private dialogRef: MatDialogRef<ProfileDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.user = data.user;
  }

  ngOnInit() {
  }
}
