import { Injectable } from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {UiCourse} from '../models/ui-course.model';
import {Observable, of} from 'rxjs';
import {Course} from '../models/course.model';
import {UiCoursesMap} from '../models/ui-courses-map.model';

@Injectable()
export class CourseService {
  coursesRequest: Observable<UiCourse[]>;
  private _coursesMap: UiCoursesMap;

  constructor(private httpRequest: HttpRequestsService) {
    this.coursesRequest = this.httpRequest.get('/courses');
    this.coursesRequest.subscribe((response: any) => {
      const courses = response.data;
      this._coursesMap = {};
      courses.forEach((course: any) => {
        this._coursesMap[course.courseName] = course.courseId;
      });
    });
  }

  getCoursesMap(): UiCoursesMap {
    return this._coursesMap;
  }

  /**
   * This will return the cached course map if initialized, as an observable for them.
   */
  getUiCourses(): Observable<any> {
    return this._coursesMap ? /*Observable.*/of(this._coursesMap) : this.coursesRequest;
  }

  getCourse(courseId: string): Observable<Course> {
    // const params = new QueryParams('courseId', courseId);
    return this.httpRequest.get('/courses/' + courseId, [], {});
  }

  addCourse(uiCourse: UiCourse): Observable<any> {
    return this.httpRequest.post('/courses', new Course(uiCourse));
  }
}
