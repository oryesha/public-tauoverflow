import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../app.service';

class Section {
}

export class Course {
  prefix: string;
  name: string;
  id: string;

  //constructor(name: string, id: string) { this.name = name; this.id = id; this.prefix = name.charAt(0); }
  constructor(name: string, id: string, prefix: string) { this.name = name; this.id = id; this.prefix = prefix; }

}

@Component({
  selector: 'app-course-page',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  isLoaded = false;
  allCourses = {};

/*  courses: string[] = ['Data Structures 03682160', 'Linear Algebra 1A 03662160', 'Discrete Math 03682000', 'Classic Physics 03252160',
    'Intro To Data Science 03685060'];*/
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

  constructor(private appService: AppService) {
    // const response;
    // this.allCourses = response.map(course => { course[0] : course});
    appService.getResponse('courses').subscribe((response) => {
      this._buildAllCourses(response);
      this.isLoaded = true;
    });
  }

  private _buildAllCourses(courses: any[]) {
    const blah = courses.map(course => new Course(course.name, course.id));
    const blah = courses.map(course => new Course(course.name, course.id, course.name.charAt(0))) as Course[];

    //const blah = courses.map(course => new Course(course.name, course.id)).values();
    //blah.forEach(course => {
    //for (let course of blah) {
    for (const course of blah) {
      if (this.allCourses[course.prefix]) {
        this.allCourses[course.prefix].push(course);
      } else {
        this.allCourses[course.prefix] = [course];
      }
    }
  }

  ngOnInit() {
  }

}
