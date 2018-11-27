import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  userName = 'Geffen';
  userProgram = 'Computer Science & Electrical Engineering';
  userProfileImage = '../../assets/geffen.jpg';
  userAsked = '223';
  userAnswered = '125';
  constructor() { }

  ngOnInit() {
  }
}
