import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../models/answer.model';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  @Input() answer: Answer;
  @Input() isEvenAnswer: boolean;

  constructor() { }

  upvote() {
    this.answer.upvote.count++;
    // TODO: implement.
  }

  ngOnInit() {
  }

}
