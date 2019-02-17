import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {Question, QuestionNavigationData} from '../models/question.model';
import {LatexRenderingService} from '../services/latex-rendering.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, AfterViewInit {
  @Input() results: Question[];
  @ViewChildren('contentContainer') containers: QueryList<ElementRef>;
  parsedContent: string[];
  equations: string[][] = [];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private latexRenderingService: LatexRenderingService,
    private routingDataService: AppRoutingDataService
  ) { }

  ngOnInit() {
    this.parsedContent = this.results.map((question: Question, index) => {
      const content = question.content;
      this.equations.push([]);
      return this.latexRenderingService.findAllEquations(content, this.equations[index]);
    });
  }

  navigateToQuestionPage(questionSelected: Question) {
    this.routingDataService.setRoutingData('question', new QuestionNavigationData(questionSelected));
    this.router.navigate(['question-page'], {queryParams: {id: questionSelected.id}});
  }

  ngAfterViewInit(): void {
    this.containers.forEach((container, index) => {
      this.latexRenderingService.renderEquations(container, this.equations[index]);
    });
  }
}
