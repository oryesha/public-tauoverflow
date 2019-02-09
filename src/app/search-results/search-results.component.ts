import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {Question, QuestionNavigationData} from '../models/question.model';
import {MatListItem} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren('resultItems') resultItems: QueryList<MatListItem>;

  @Input() results: Question[];
  @Output() viewChecked = new EventEmitter();

  private resultItemsChanges: Subscription;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private routingDataService: AppRoutingDataService
  ) { }

  ngOnInit() {
  }

  navigateToQuestionPage(questionSelected: Question) {
    this.routingDataService.setRoutingData('question', new QuestionNavigationData(questionSelected));
    this.router.navigate(['question-page'], {queryParams: {id: questionSelected.id}});
  }

  ngOnDestroy(): void {
    if (this.resultItemsChanges) {
      this.resultItemsChanges.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    // if (this.resultItems.length !== this.results.length) {
    //   this.resultItemsChanges = this.resultItems.changes.subscribe(() => {
    //     debugger;
    //   });
    // } else {
    //   debugger;
    // }
  }
}
