import { Component, OnInit } from '@angular/core';
import {Course} from '../models/course.model';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UiCourse, UiCourseNavigationData} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';
import {Question, QuestionNavigationData} from '../models/question.model';


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
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let courseId;
    this.route.queryParams.subscribe(
      params => {
        courseId = params.courseId;
        const routingData = this.routingDataService.getRoutingData(courseId);
        if (routingData) {
          this.uiCourse = routingData.getData();
          this.initialDataLoaded = true;
        }
        this.courseService.getCourse(courseId).subscribe((course: any) => {
          this.course = Course.deserialize(course);
          this.uiCourse = this.course.uiCourse;
          this.initialDataLoaded = true;
          this.courseDataLoaded = true;
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
  goToQuestion(question: Question) {
    this.routingDataService.setRoutingData('question', new QuestionNavigationData(question));
    this.router.navigate(['question-page'], {queryParams: {id: question.id}});
  }

  goToEditor(goTo: string) {
    this.routingDataService.setRoutingData('selectedCourses', new UiCourseNavigationData(this.uiCourse));
    switch (goTo) {
      case 'question': {
        this.router.navigate(['/question-editor']);
        break;
      }
      case 'review': {
        this.router.navigate(['/course-review-editor']);
        break;
      }
      case 'post': {
        this.router.navigate(['/find-a-partner-editor']);
        break;
      }
    }
  }

}
