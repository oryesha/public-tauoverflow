import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../models/question.model';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() question: Question;
  @Output() showAnswerEditor = new EventEmitter<void>();

  upvote() {
    this.question.upvote.count++;
    // TODO: add the upvoter and send an update to the server.
  }

  constructor() { }

  ngOnInit() {

  }

  newAnswer() {
    this.showAnswerEditor.emit();
  }
}
