import { Injectable } from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {UiCourse} from '../models/ui-course.model';
import {Observable, of} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable()
export class CourseService {
  coursesRequest: Observable<UiCourse[]>;
  cachedCourses: UiCourse[];

  constructor(private httpRequest: HttpRequestsService) {
    this.coursesRequest = this.httpRequest.get('/courses');
    this.coursesRequest.subscribe(courses => this.cachedCourses = courses);
  }

  getUiCourses(): Observable<UiCourse[]> {
    return this.cachedCourses ? /*Observable.*/of(this.cachedCourses) : this.coursesRequest;
  }

  getCourse(courseId: string): Observable<Course> {
    const params = new QueryParams('courseId', courseId);
    return this.httpRequest.get('/courses', [params]);
  }

  addCourse(uiCourse: UiCourse): Observable<any> {
    return this.httpRequest.post('/courses', uiCourse);
  }
}
