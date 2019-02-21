import { Injectable } from '@angular/core';
import {HttpRequestsService, QueryParams} from './http-requests.service';
import {UiCourse} from '../models/ui-course.model';
import {Observable, of} from 'rxjs';
import {Course} from '../models/course.model';
import {FacultyToUiCourses, UiCoursesMap, UiCoursesMapNumbers} from '../models/ui-courses-map.model';

@Injectable()
export class CourseService {
  coursesRequest: Observable<any>;
  private _courses: UiCourse[] = [];
  private _facultyToCourses: FacultyToUiCourses = {};
  private _coursesMap: UiCoursesMap = {};
  private _courseNumberToName: UiCoursesMapNumbers = {};
  private readonly _coursesLoadedPromise: Promise<any>;

  constructor(private httpRequest: HttpRequestsService) {
    this.coursesRequest = this.httpRequest.get('/courses');
    this._coursesLoadedPromise = new Promise<any>(resolve => {
      this.coursesRequest.subscribe((response: any) => {
        const courses = response;
        this._coursesMap = {};
        courses.forEach((course: any) => {
          const uiCourse = new UiCourse(course.id, course.courseName, course.courseNumber);
          this._courses.push(uiCourse);
          this.addCourseToMapByFaculty(uiCourse);
          this._coursesMap[course.courseName] = uiCourse;
          this._courseNumberToName[course.courseNumber] = course.courseName;
          resolve(null);
        });
      });
    });
  }

  waitForCourses(): Promise<any> {
    return this._coursesLoadedPromise;
  }

  addCourseToMapByFaculty(uiCourse: UiCourse) {
    const faculty = uiCourse.courseNumber.substring(0, 2);
    if (!this._facultyToCourses[faculty]) {
      this._facultyToCourses[faculty] = [];
    }
    this._facultyToCourses[faculty].push(uiCourse);
  }

  getCoursesMap(): UiCoursesMap {
    return this._coursesMap;
  }

  getCourseName(courseNumber: string) {
    return this._courseNumberToName[courseNumber];
  }

  getCourses(): UiCourse[] {
    return this._courses;
  }

  getFacultyToCourses(): FacultyToUiCourses {
    return this._facultyToCourses;
  }

  getCourse(courseId: string): Observable<Course> {
    return this.httpRequest.get('/courses', [], [courseId]);
  }

  // get skilled users firebase token
  getSkilledUsers(courseIds: string[]): Observable<any> {
    const queryParams = new QueryParams('courseIds', courseIds);
    return this.httpRequest.get('/courses/skilled-users', [queryParams]);
  }

  addCourse(uiCourse: UiCourse): Observable<any> {
    return this.httpRequest.post('/courses', new Course(uiCourse));
  }

  public doNothing() {
    console.log('Courses started loading');
  }
}
