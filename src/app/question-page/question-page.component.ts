import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
  @ViewChild('questionPageContainer') questionPageContainer: ElementRef;

  isShowAnswerEditor: boolean;
  isLoaded = false;
  isUserOwner: boolean;
  isQuestionFavorite = false; // TODO: implement real favorite questions
  hasAnswers: boolean;
  question: Question;
  user: UserProfile;
  answerCounter = 0;
  constructor(private routingDataService: AppRoutingDataService,
              private questionService: QuestionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private answerService: AnswerService) {
    const routingData = routingDataService.getRoutingData('question');
    if (routingData) {
      this.question = routingData.getData();
      console.log('in question page');
      console.log(this.question);
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
      this.isUserOwner = this.user.id === this.question.owner.id;
      if (this.question.answers.length > 0) {
        this.hasAnswers = true;
      } else {
        this.hasAnswers = false;
      }
      console.log(this.user.id);
      console.log(this.question.owner.id);
    });
  }

  showAnswerEditor() {
    this.isShowAnswerEditor = true;
  }

  scrollToBottom() {
    const questionPageEl = this.questionPageContainer.nativeElement;
    questionPageEl.scrollTop = questionPageEl.scrollHeight;
  }

  cancelAnswer() {
    this.isShowAnswerEditor = false;
  }

  postAnswer(event: PostContent) {
    const content = event.content;
    const answer = new Answer(content, this.user, this.question.id);
    this.isShowAnswerEditor = false;
    this.question.answers.push(answer);
    this.answerService.createAnswer(answer).subscribe((response: any) => {
      answer.id = response.data._id;
      this.user.answered += 1;
      this.answerService.notifyAnswer(this.question.owner.firebaseToken);
    });
  }

  isEven() {
    const isEven = this.answerCounter % 2;
    this.answerCounter++;
    return 1 - isEven;
  }

  UnmarkFavorite() {
    this.isQuestionFavorite = false;
  }

  MarkFavorite() {
    this.isQuestionFavorite = true;
  }
}
