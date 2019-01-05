import { Injectable } from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {UiCourse} from '../models/ui-course.model';
import {Observable, of} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable()
export class CourseService {
  coursesRequest: Observable<Course[]>;
  cachedCourses: Course[];

  // temp1: UiCourse[] = [];
  temp2 = [
    {
      name: 'Data Structures',
      courseId: '036821581'
    },
    {
      name: 'Intro To Data Science',
      courseId: '036850601'
    },
    {
      name: 'Intro to NLP',
      courseId: '036832351'
    },
    {
      name: 'Linear Algebra 1A',
      courseId: '036621601'
    },
    {
      name: 'Discrete Math',
      courseId: '036820001'
    },
    {
      name: 'Classic Physics',
      courseId: '032521601'
    },
    {
      name: 'Intro To Data Science',
      courseId: '036850601'
    },
    {
      name: 'Algorithms',
      courseId: '036821601'
    }
  ];

  constructor(private httpRequest: HttpRequestsService) {
    this.coursesRequest = this.httpRequest.get('/courses');
    this.coursesRequest.subscribe((courses: Course[]) => {
      this.cachedCourses = [];
      courses.forEach(course => {
        this.cachedCourses.push(course);
      });
    });
    // this.temp2.forEach(course => {
    //   this.addCourse(new UiCourse(course.name, course.courseId)).subscribe(() => {});
    // });
  }

  // _cache(courses: Course[]) {
  //   this.cachedCourses = [];
  //   courses.forEach(course => {
  //     this.cachedCourses.push(course.uiCourse);
  //   });
  // }

  getUiCourses(): Observable<any> {
    // return /*Observable.*/of(this.cachedCourses);
    return this.cachedCourses ? /*Observable.*/of(this.cachedCourses) : this.coursesRequest;
  }

  getCourse(courseId: string): Observable<Course> {
    // const params = new QueryParams('courseId', courseId);
    return this.httpRequest.get('/courses/' + courseId, [], {});
  }

  addCourse(uiCourse: UiCourse): Observable<any> {
    return this.httpRequest.post('/courses', new Course(uiCourse));
  }
}
