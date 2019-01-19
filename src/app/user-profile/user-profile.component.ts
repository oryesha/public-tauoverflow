import { Component, OnInit } from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserProfile} from '../models/user-profile.model';
import {AppService} from '../app.service';
import {UserService} from '../services/user.service';
import {Question} from '../models/question.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails: UserProfile;
  isLoaded = false;

  constructor(private appService: AppService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private routingDataService: AppRoutingDataService) {
    const routingData = routingDataService.getRoutingData('id');
      route.queryParams.subscribe(
        (params) => {
          const id = params.id;
          console.log('This is the ID = ' + id);
          this.userService.getUserFromDatabase(id).subscribe((user: any) => {
            if (user) {
              this.userDetails = UserProfile.deserialize(user);
              this.isLoaded = true;
              // this.userService.setCurrentUser(this.userDetails);
            }
          });
        });
  }

  ngOnInit() {
    const routingData = this.routingDataService.getRoutingData('id');
  }
}
