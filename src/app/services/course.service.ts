import { Injectable } from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {UiCourse} from '../models/ui-course.model';
import {Observable} from 'rxjs';
import {Course} from '../models/course.model';

@Injectable()
export class CourseService {

  constructor(private httpRequest: HttpRequestsService) { }

  getUiCourses(): Observable<UiCourse[]> {
    return this.httpRequest.get('courses');
  }

  getCourse(courseId: string): Observable<Course> {
    const params = new QueryParams('courseId', courseId);
    return this.httpRequest.get('courses', [params]);
  }
}
