import { Component, OnInit } from '@angular/core';
import {Course} from '../models/course.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {ActivatedRoute} from '@angular/router';

class Section {
}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  course: Course;
/*  questions: Section[] = [
    {
      title: 'Amortized time complexity',
      student: 'Or Yesha',
      updated: new Date(2018, 10, 27),
    },
    {
      title: 'Red-Black tree',
      student: 'Nati Yosephian',
      updated: new Date(2018, 10, 5),
    }
  ];

  reviews: Section[] = [
    {
      title: 'Great Course!',
      student: 'Or Yesha',
      updated: new Date(2018, 9, 22),
    }
  ];

  partners: Section[] = [
    {
      title: 'Looking for a partner for the final project',
      student: 'Ori Licht',
      updated: new Date(2018, 10, 5),
    }
  ];*/

  constructor(private routingDataService: AppRoutingDataService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let courseId;
    this.route.queryParams.subscribe(
      params => {
        courseId = params.courseId;
        this.course = this.routingDataService.getRoutingData(courseId).getData();
        console.log(this.course);
      }
    );
    // debugger;
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
