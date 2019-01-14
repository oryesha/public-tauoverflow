import {Component, Input, OnInit} from '@angular/core';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {Question, QuestionNavigationData} from '../models/question.model';
import {UiCourse} from '../models/ui-course.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  @Input() results: any[];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private routingDataService: AppRoutingDataService
  ) { }

  ngOnInit() {
  }

  navigateToQuestionPage(questionSelected: any) {
    // const question = Question.deserialize(questionSelected);
    // this.routingDataService.setRoutingData(
    //   'question', new QuestionNavigationData(question));
    this.router.navigate(['question-page'], {queryParams: {id: questionSelected._id}});
  }
}
