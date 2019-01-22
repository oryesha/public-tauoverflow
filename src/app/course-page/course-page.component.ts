import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../models/course.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UiCourse, UiCourseNavigationData} from '../models/ui-course.model';
import {CourseService} from '../services/course.service';
import {Question, QuestionNavigationData} from '../models/question.model';
import {PostType} from '../models/post.model';
import {CourseReview} from '../models/course-review.model';
import {ClipboardService} from 'ngx-clipboard';
import {MatSnackBar} from '@angular/material';
import {CourseRelatedPost} from '../models/course-related-post.model';

class StarsCounter {
  filledStars: number;
  halfStar = 0;
  emptyStars: number;

  constructor(rank: number) {
    const fraction = rank % 1;
    this.filledStars = rank - fraction;
    if (fraction >= 0.5) {
      this.halfStar++;
    } else if (fraction > 0) {
      this.filledStars++;
    }
    this.emptyStars = 5 - this.filledStars - this.halfStar;
  }
}

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
  reviews: CourseReview[];
  courseReviewId: string;
  starsCounter: StarsCounter;
  @Input() postType: PostType;

  constructor(private routingDataService: AppRoutingDataService,
              private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private clipboardService: ClipboardService) {
  }

  range(rank: number) {
    return Array(rank - (rank % 1));
  }

  ngOnInit() {
    let courseId;
    this.route.queryParams.subscribe(
      params => {
        this.postType = params.tab ? params.tab : PostType.QUESTION;
        courseId = params.courseId;
        const routingData = this.routingDataService.getRoutingData(courseId);
        if (routingData) {
          this.uiCourse = routingData.getData();
          this.initialDataLoaded = true;
        }
        this.courseReviewId = params.reviewId ? params.reviewId : undefined;
        this.courseService.getCourse(courseId).subscribe((course: any) => {
          this.course = Course.deserialize(course);
          this.starsCounter = new StarsCounter(this.course.rank);
          this.uiCourse = this.course.uiCourse;
          this.initialDataLoaded = true;
          this.courseDataLoaded = true;
        });
      }
    );
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

  copyEmail(post: CourseRelatedPost) {
    this.clipboardService.copyFromContent(post.owner.email);
    this.snackBar.open('Email copied to clipboard', '', {
      duration: 2000 // Prompt the toast 2 seconds.
    });
  }
}
