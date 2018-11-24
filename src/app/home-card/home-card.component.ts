import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {
  userName = 'Geffen';
  userProgram = 'Computer Since & Electrical Engineering';
  userProfileImage = '../../assets/geffen.jpg';
  userAsked = '223';
  userAnswered = '125';
  constructor() { }

  ngOnInit() {
  }
}
