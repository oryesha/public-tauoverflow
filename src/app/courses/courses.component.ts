import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Course} from '../models/course.model';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';

class Section {
}

// class UiCourse {
//   name: string;
//   id: string;
//
//   constructor(name: string, id: string) { this.name = name; this.id = id; }
// }

@Component({
  selector: 'app-course-page',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  static CourseNavigationData = class implements RoutingData<UiCourse> {
    constructor(private course: UiCourse) {}

    getData(): UiCourse {
      return this.course;
    }
  };

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

  constructor(private appService: AppService,
              private router: Router,
              private courseService: CourseService,
              private routingDataService: AppRoutingDataService) {
    this.courseService.getUiCourses().subscribe(res => {
      const temp: UiCourse[] = [];
      res.data.docs.forEach(course => {
        temp.push(new UiCourse(course.name, course.courseId));
      });
      this._buildAllCourses(temp);
      this.isLoaded = true;
    });
  }

  private coursesMap: {[courseId: string]: UiCourse} = {};

  private _buildAllCourses(courses: UiCourse[]) {
    // const uiCourses: UiCourse[] =
    //   courses.map((course: Course) => {
    //     this.coursesMap[course.courseId] = course;
    //     return new UiCourse(course.name, course.courseId);
    //   });
    courses.sort((c1, c2) => {
      if (c1.name > c2.name) { return 1; }
      if (c1.name < c2.name) { return -1; }
      return 0;
    });
    this.allCourses = courses;
  }

  navigateToCoursePage(uiCourse: UiCourse) {
    const courseData = new CoursesComponent.CourseNavigationData(uiCourse);
    this.routingDataService.setRoutingData(uiCourse.courseNumber, courseData);
    this.router.navigate(['/course-page'], { queryParams: { courseId: uiCourse.courseNumber } });
  }

  ngOnInit() {
  }
}
