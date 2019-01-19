import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from '../models/question.model';
import {UserProfile} from '../models/user-profile.model';
import {QuestionService} from '../services/question.service';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss']
})
export class QuestionCardComponent implements OnInit {
  @Input() question: Question;
  @Input() user: UserProfile;
  @Output() showAnswerEditor = new EventEmitter<void>();
  constructor( private questionService: QuestionService) { }
  upvote() {
    if (this.question.upvote.upvoters.includes(this.user.id)) {
      return;
    }
    this.question.upvote.count++;
    this.question.upvote.upvoters.push(this.user.id);
    this.questionService.updateQuestion(this.question).subscribe(res => {
      console.log('Update Succesful');
    }, err => {
      console.error('Update Unsuccesful');
    });
  }
  ngOnInit() {
  }

  newAnswer() {
    this.showAnswerEditor.emit();
  }
}
