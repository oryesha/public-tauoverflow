import { Injectable } from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {UiCourse} from '../models/ui-course.model';
import {Observable, of} from 'rxjs';
import {Course} from '../models/course.model';
import {UiCoursesMap} from '../models/ui-courses-map.model';

@Injectable()
export class CourseService {
  coursesRequest: Observable<any>;
  private _courseNames: string[] = [];
  private _coursesMap: UiCoursesMap = {};
  private readonly _coursesLoadedPromise: Promise<any>;

  constructor(private httpRequest: HttpRequestsService) {
    this.coursesRequest = this.httpRequest.get('/courses');
    this._coursesLoadedPromise = new Promise<any>(resolve => {
      this.coursesRequest.subscribe((response: any) => {
        const courses = response;
        this._coursesMap = {};
        courses.forEach((course: any) => {
          const uiCourse = new UiCourse(course.id, course.courseName, course.courseNumber);
          this._courseNames.push(course.courseName);
          this._coursesMap[course.courseName] = uiCourse;
          resolve(null);
        });
      });
    });
  }

  waitForCourses(): Promise<any> {
    return this._coursesLoadedPromise;
  }

  getCoursesMap(): UiCoursesMap {
    return this._coursesMap;
  }

  getCourseNames(): string[] {
    return this._courseNames;
  }

  getCourse(courseId: string): Observable<Course> {
    return this.httpRequest.get('/courses', [], [courseId]);
  }

  addCourse(uiCourse: UiCourse): Observable<any> {
    return this.httpRequest.post('/courses', new Course(uiCourse));
  }
}
