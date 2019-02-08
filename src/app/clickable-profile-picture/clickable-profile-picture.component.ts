import {Component, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {ProfileDetailsDialogComponent} from '../profile-details-dialog/profile-details-dialog.component';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {UserProfile} from '../models/user-profile.model';

@Component({
  selector: 'app-clickable-profile-picture',
  templateUrl: './clickable-profile-picture.component.html',
  styleUrls: ['./clickable-profile-picture.component.scss']
})
export class ClickableProfilePictureComponent implements OnInit {
  @Input() owner: UserProfile;
  @Input() isUserOwner: boolean;

  defaultImage = '../../assets/avatar.png';

  constructor(private userService: UserService,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit() {
  }

  seeUser() {
    if (this.isUserOwner) {
      this.userService.getUser().then((user) => {
        this.router.navigate(['user-profile'],
          {queryParams: {id: user.firebaseToken}});
      });
    } else {
      this._showUserDetails();
    }
  }

  private _showUserDetails() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'ProfileDetailsDialogClass';
    dialogConfig.data = {
      id: 1,
      user: this.owner
    };
    this.dialog.open(ProfileDetailsDialogComponent, dialogConfig);
  }

}
