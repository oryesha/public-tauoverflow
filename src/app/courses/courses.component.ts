import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Course} from '../models/course.model';

class Section {
}

class UiCourse {
  name: string;
  id: string;

  constructor(name: string, id: string) { this.name = name; this.id = id; }
}

@Component({
  selector: 'app-course-page',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  isLoaded = false;
  allCourses: UiCourse[] = [];
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
    appService.getResponse('courses').subscribe((response) => {
      this._buildAllCourses(response as Course[]);
      this.isLoaded = true;
    });
  }

  private _buildAllCourses(courses: Course[]) {
    const uiCourses: UiCourse[] =
      courses.map((course: Course) => new UiCourse(course.name, course.courseId));
    uiCourses.sort((c1, c2) => {
      if (c1.name > c2.name) { return 1; }
      if (c1.name < c2.name) { return -1; }
      return 0;
    });
    this.allCourses = uiCourses;
  }

  ngOnInit() {
  }
}
