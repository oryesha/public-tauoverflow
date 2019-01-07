import {Component, OnInit} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from '../services/question.service';
import {Question} from '../models/question.model';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {
  isShowAnswerEditor: boolean;
  isLoaded = false;
  question: Question;

  constructor(private routingDataService: AppRoutingDataService,
              private questionService: QuestionService,
              private route: ActivatedRoute) {
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
  }

  showAnswerEditor() {
    this.isShowAnswerEditor = true;
  }
}
