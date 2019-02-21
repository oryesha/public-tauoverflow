import {UiCourse} from './ui-course.model';

export interface UiCoursesMap {
  // Maps course name to course-number.
  [name: string]: UiCourse;
}

export interface FacultyToUiCourses {
  [faculty: string]: UiCourse[];
}

export interface FacultyToIsSeen {
  [faculty: string]: boolean;
}


export interface UiCoursesMapNumbers {
  // Maps course number to name.
  [number: string]: string;
}
