import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
  chips: string[] = ['Data Structures'];

  constructor() { }

  ngOnInit() {
  }

}