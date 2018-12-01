import { Component, OnInit } from '@angular/core';

class Section {
}

@Component({
  selector: 'app-course-page',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: string[] = ['Data Structures 03682160', 'Linear Algebra 1A 03662160', 'Discrete Math 03682000', 'Classic Physics 03252160',
    'Intro To Data Science 03685060'];
  allACourses: Section[] = [
    {
      name: 'Algorithms',
      courseNum: '03682160',
    },
    {
      name: 'Algebra B1',
      courseNum: '03662132',
    }
  ];

  allBCourses: Section[] = [
    {
      name: 'Big Data',
      courseNum: '05725135',
    },
    {
      name: 'Biogeography',
      courseNum: '04553703',
    }
  ];

  myMandatoryCourses: Section[] = [
    {
      name: 'Algorithms',
      courseNum: '03682160',
    },
    {
      name: 'Data Structures',
      courseNum: '03682158',
    }
  ];

  myChoiceCourses: Section[] = [
    {
      name: 'Intro to NLP',
      courseNum: '03683235',
    },
    {
      name: 'Intro to Data Science',
      courseNum: '03683319'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
