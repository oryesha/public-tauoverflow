import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  @Input() isProfilePage = false;
  @Input() classes: string;
  isLoaded = false;
  userDetails: {
    name: { first: string, last: string };
    program: string;
    profilePicturePath: string;
    rank: number;
    // asked: number;
    // answered: number;
    description: string;
    skills: string[];
  };

  constructor(private appService: AppService) {
    appService.getResponse('userDetails').subscribe((response) => {
      this.userDetails = response;
      this.isLoaded = true;
    });
    // debugger;
  }

  ngOnInit() {
  }
}


// export class UserDetails {
//   name: { first: string, last: string };
//   program: string;
//   profilePicturePath: string;
//   rank: number;
//   // asked: number;
//   // answered: number;
//   description: string;
//   skills: string[];
// }
