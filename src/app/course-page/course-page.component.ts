import { Component, OnInit } from '@angular/core';

class Section {
}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  course_name: string;
  questions: Section[] = [
    {
      title: 'Amortized time complexity',
      student: 'Or Yesha',
      updated: new Date(2018, 10, 27),
    },
    {
      title: 'Red-Black tree',
      student: 'Nati Yosephian',
      updated: new Date(2018, 10, 5),
    }
  ];

  reviews: Section[] = [
    {
      title: 'Great Course!',
      student: 'Or Yesha',
      updated: new Date(2018, 9, 22),
    }
  ];

  partners: Section[] = [
    {
      title: 'Looking for a partner for the final project',
      student: 'Ori Licht',
      updated: new Date(2018, 10, 5),
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
