import {Component, OnInit} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../services/question.service';
import {Question} from '../models/question.model';
import {PostContent} from '../post-editor/post-editor.component';
import {Answer} from '../models/answer.model';
import {AnswerService} from '../services/answer.service';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
  isShowAnswerEditor: boolean;
  isLoaded = false;
  question: Question;
  user: UserProfile;
  constructor(private routingDataService: AppRoutingDataService,
              private questionService: QuestionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private answerService: AnswerService) {
    debugger;
    const routingData = routingDataService.getRoutingData('question');
    if (routingData) {
      this.question = routingData.getData();
      this.isLoaded = true;
    } else {
      route.queryParams.subscribe(
        (params) => {
          const id = params.id;
          questionService.getQuestion(id).subscribe((question: any) => {
            this.question = Question.deserialize(question);
            this.isLoaded = true;
          });
        });
    }
  }

  ngOnInit() {
    this.userService.getUser().then((user: UserProfile) => {
      this.user = user;
    });
  }

  showAnswerEditor() {
    this.isShowAnswerEditor = true;
  }

  postAnswer(event: PostContent) {
    const content = event.content;
    const answer = new Answer(content, this.user, this.question.id);
    this.isShowAnswerEditor = false;
    this.question.answers.push(answer);
    this.answerService.createAnswer(answer).subscribe((response: any) => {
      answer.id = response.data._id;
      this.user.answered += 1;
    });
  }
}
