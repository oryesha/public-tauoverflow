import {RoutingData} from '../app-routing-data.service';
import {Question} from './question.model';

export class UiCourse {
  id: string;
  name: string;
  courseNumber: string;

  constructor(id: string, name: string, courseNumber: string) {
    this.id = id;
    this.name = name;
    this.courseNumber = courseNumber;
  }

  static deserialize(course: any): UiCourse {
    return new UiCourse(course._id, course.name, course.courseNumber);
  }
}

export class UiCourseNavigationData implements RoutingData<UiCourse[]> {
  constructor(private uiCourse: UiCourse) {
  }

  getData(): UiCourse[] {
    return [this.uiCourse];
  }
}
