import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails: UserProfile;
  isLoaded = false;

  constructor(private userService: UserService) {
    this.userService.getUser().then((user: UserProfile) => {
      this.userDetails = user;
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }
}
