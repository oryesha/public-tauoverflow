import { Component, OnInit } from '@angular/core';

class Section {
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDescription = '25 years old developer from Raanana';
  userName = 'Geffen Menchik';
  userProgram = 'Computer Science & Electrical Engineering';
  userProfileImage = '../../assets/geffen.jpg';
  skills: string[] = ['Software1', 'Computationals Models', 'Data Structures', '+'];

  myQuestions: Section[] = [
    {
      title: 'List sort in Java',
      votes: '23',
      answers: '9',
    },
    {
      title: 'Map Reduce',
      votes: '12',
      answers: '4',
    },
    {
      title: 'P = NP?',
      votes: '5',
      answers: '7',
    }
  ];

  findPartners: Section[] = [
    {
      title: 'Looking for partner for the final project'
    }
  ];
  changeHours: Section[] = [
    {
      title: 'Electronics lab'
    },
    {
      title: 'Physics1 lab'
    }
  ];
  reviews: Section[] = [
    {
      title: 'Google workshop was great'
    }
  ];

  favorites: Section[] = [
    {
      title: 'Newton second law',
      votes: '10',
      answers: '20',
    },
    {
      title: 'Psychology',
      votes: '23',
      answers: '9',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
