import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  programs: string[] = ['Computer Science', 'Electrical Engineering', 'Law', 'Computer Science and Electrical Engineering', 'Economics',
    'Management', 'Physics', 'Chemistry'];

  constructor() { }

  ngOnInit() {
  }

}
