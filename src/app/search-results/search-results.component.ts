import {Component, Input, OnInit} from '@angular/core';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {Question} from '../models/question.model';
import {UiCourse} from '../models/ui-course.model';
class Section {
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  static SelectedQuestion = class implements RoutingData<Question> {
    constructor(private selectedQuestion: Question) {}

    getData(): Question {
      return this.selectedQuestion;
    }
  };


  @Input() results: Section[];
  // results: Section[] = [
//     {
//       from: 'Or Yesha',
//       created: new Date(2017, 12, 21),
//       subject: 'how to create linked list in c++',
//       content: 'I have tried to create it with...',
//       answersNum: '2',
//       votes: '2'
//     },
//     {
//       from: 'Nethanel Yosephian',
//   created: new Date(2012, 10, 27),
//   subject: 'sort list from smaller item to big without using java sort',
//   content: 'does anybody know how to implement this kind of sort...',
//   answersNum: '6',
//   votes: '24'
// }
//   ];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private userService: UserService,
    private routingDataService: AppRoutingDataService
  ) { }

  ngOnInit() {
  }

  private navigateToQuestionPage(questionSelected: any) {
    const tmpQuestion = new Question(questionSelected.subject,
      questionSelected.content, questionSelected.owner, questionSelected.relatedCourses,
      questionSelected.answers, questionSelected.id, questionSelected.timestamp,
      questionSelected.isLocked);
    const question = new SearchResultsComponent.SelectedQuestion(tmpQuestion);
    this.routingDataService.setRoutingData('question', question);
    this.router.navigate(['/question-page']);
  }
}
