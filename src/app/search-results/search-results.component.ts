import {Component, Input, OnInit} from '@angular/core';

class Section {
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
