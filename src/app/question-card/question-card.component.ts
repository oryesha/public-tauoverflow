import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  date: Date = new Date(2018, 9, 13);
  answerScore = 27;
  onClickMe() {
    this.answerScore++;
  }
  constructor() { }
  ngOnInit() {
  }

}
