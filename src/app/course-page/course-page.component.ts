import { Component, OnInit } from '@angular/core';
import {Course} from '../models/course.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {ActivatedRoute} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';


@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  uiCourse: UiCourse; // Passed in client side navigation.
  course: Course; // Fetched from server.
  courseDataLoaded: boolean;
  initialDataLoaded: boolean;

  constructor(private routingDataService: AppRoutingDataService,
              private courseService: CourseService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let courseId;
    this.route.queryParams.subscribe(
      params => {
        courseId = params.courseId;
        this.uiCourse = this.routingDataService.getRoutingData(courseId).getData();
        this.courseService.getCourse(courseId).subscribe(res => {
          this.course = res;
        });
      }
    );
  }

  starsRange(rank: number) {
    const list = [];
    for (let i = 1; i <= rank; i++) {
      list.push(i);
    }
    return list;
  }

  halfStar(rank: number) {
    return (rank % 1) !== 0;
  }
  emptyStarsRange(rank: number) {
    const n = 5 - rank;
    const list = [];
    for (let i = 1; i <= n; i++) {
      list.push(i);
    }
    return list;
  }

}
