import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../models/answer.model';
import {AnswerService} from '../services/answer.service';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-answer-card',
  templateUrl: './answer-card.component.html',
  styleUrls: ['./answer-card.component.scss']
})
export class AnswerCardComponent implements OnInit {
  @Input() answer: Answer;
  @Input() isEvenAnswer: boolean;
  defaultImage = '../../assets/avatar.png';

  constructor(private answerService: AnswerService,
              private userService: UserService) { }

  upvote() {
    this.userService.getUser().then((user) => {
      if (this.answer.upvote.upvoters.includes(user.id)) {
        return;
      }
      this.answer.upvote.count++;
      this.answer.upvote.upvoters.push(user.id);
      this.answerService.updateAnswer(this.answer).subscribe(res => {
        console.log('Update Succesful');
      }, err => {
        console.error('Update Unsuccesful');
      });
    });
  }

  ngOnInit() {
  }

}
