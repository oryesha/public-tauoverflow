import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  date: Date = new Date(2018, 9, 14);
  answerScore = 12;
  constructor() { }
  onClickMe() {
    this.answerScore++;
  }
  ngOnInit() {
  }

}
