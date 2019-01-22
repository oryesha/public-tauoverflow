import {Component, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';

class Section {
}

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
  courseNames: string[] = [];
  coursesMap: UiCoursesMap;

  constructor(private appService: AppService,
              private router: Router,
              private courseService: CourseService,
              private routingDataService: AppRoutingDataService) {
  }

  navigateToCoursePage(course: UiCourse|string) {
    const uiCourse = typeof course === 'string' ? this.coursesMap[course] : course;
    const courseData = new CoursesComponent.CourseNavigationData(uiCourse);
    this.routingDataService.setRoutingData(uiCourse.courseNumber, courseData);
    this.router.navigate(['/course-page'], { queryParams: { courseId: uiCourse.courseNumber } });
  }

  ngOnInit() {
    this.courseService.waitForCourses().then(() => {
      this.courseService.getCourseNames().forEach(courseName => {
        this.coursesMap = this.courseService.getCoursesMap();
        this.allCourses.push(this.coursesMap[courseName]);
        this.courseNames.push(courseName);
      });
      this._sortCourses();
      this.isLoaded = true;
    });
  }

  private _sortCourses() {
    this.allCourses.sort((c1, c2) => {
      if (c1.name > c2.name) { return 1; }
      if (c1.name < c2.name) { return -1; }
      return 0;
    });
  }
}
