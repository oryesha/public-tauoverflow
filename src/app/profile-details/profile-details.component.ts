import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  name: { first: string, last: string };
  program: string;
  profilePicturePath: string;
  rank: number;
  // asked: number;
  // answered: number;
  @Input() description: string;
  @Input() skills: string[];
  isProfilePage = false;

  constructor(private appService: AppService) {
    const x = appService.getAll();
    // x.pipe()
  }

  ngOnInit() {
  }
}
