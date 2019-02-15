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
import {MessagingService} from '../services/messaging.service';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
  @ViewChild('questionPageContainer') questionPageContainer: ElementRef;

  isShowAnswerEditor: boolean;
  isLoaded = false;
  isUserQuestionOwner: boolean;
  isQuestionLocked: boolean;
  isQuestionFavorite = false;
  question: Question;
  user: UserProfile;
  answerCounter = 0;

  constructor(private routingDataService: AppRoutingDataService,
              private questionService: QuestionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private answerService: AnswerService,
              private messagingService: MessagingService) {
    this.userService.getUser().then((user: UserProfile) => {
      this.user = user;
      const routingData = routingDataService.getRoutingData('question');
      if (routingData) {
        this.question = routingData.getData();
        this._updateMembers();
        this.isLoaded = true;
        routingDataService.setRoutingData('question', null);
      } else {
        route.queryParams.subscribe(
          (params) => {
            const id = params.id;
            questionService.getQuestion(id).subscribe((question: any) => {
              this.question = Question.deserialize(question);
              this._updateMembers();
              this.isLoaded = true;
            });
          });
      }
    });
  }

  private _updateMembers() {
    this.isUserQuestionOwner = this.user.id === this.question.owner.id;
    this.isQuestionLocked = this.question.isLocked;
    if (!this.user.favorites || this.user.favorites.length === 0) {
      return;
    }
    this.isQuestionFavorite = this.user.favorites.map((question: Question) => {
      return question.id;
    }).includes(this.question.id);
  }

  ngOnInit() {
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
      // const url = 'http://localhost:4200/question-page?id=';
      this.messagingService.sendMessage(this.question.owner.firebaseToken, this.user.firebaseToken,
        this.question.subject, this.user.name.first + ' ' + this.user.name.last,
        this.question.id, true);
    });
  }

  isEven() {
    const isEven = this.answerCounter % 2;
    this.answerCounter++;
    return 1 - isEven;
  }

  UnmarkFavorite() {
    this.isQuestionFavorite = false;
    const index = this.user.favorites.map((question: Question) => question.id)
      .indexOf(this.question.id, 0);
    if (index > -1) {
      this.user.favorites.splice(index, 1);
    }
    this._updateFavorites();
  }

  MarkFavorite() {
    this.isQuestionFavorite = true;
    this.user.favorites.push(this.question);
    this._updateFavorites();
  }

  LockQuestion() {
    this.isQuestionLocked = true;
    this.question.isLocked = true;
    this.questionService.updateQuestion(this.question).subscribe(() => {});
  }

  UnlockQuestion() {
    this.isQuestionLocked = false;
    this.question.isLocked = false;
    this.questionService.updateQuestion(this.question).subscribe(() => {});
  }

  private _updateFavorites() {
    this.userService.updateFavorites(this.user, this.question).subscribe(() => {});
  }

  private checkIfUserAnswerOwner(id: string): boolean {
    return this.user.id === id;
  }
}
