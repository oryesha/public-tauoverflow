import {UiCourse} from './ui-course.model';

export interface UiCoursesMap {
  // Maps course name to course-number.
  [name: string]: UiCourse;
}
