import { Component, OnInit } from '@angular/core';

class Section {
}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {

  folders: Section[] = [
    {
      name: 'Linear Algebra',
      updated: '50026665',
    },
    {
      name: 'Physics',
      updated: '500337879',
    }
  ];
  notes: Section[] = [
    {
      name: 'Intro to NLP',
      updated: '500337879',
    },
    {
      name: 'Intro to Data Since',
      updated: '500337879',
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
