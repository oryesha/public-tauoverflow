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
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {CourseRelatedPost} from '../models/course-related-post.model';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';
import {DeleteConfirmDialogComponent} from '../delete-confirm-dialog/delete-confirm-dialog.component';
import {ReviewService} from '../services/review.service';
import {PartnerPostService} from '../services/partner-post.service';

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
  user: UserProfile;
  isInMyCourses = false;
  @Input() postType: PostType;

  constructor(private routingDataService: AppRoutingDataService,
              private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private clipboardService: ClipboardService,
              private dialog: MatDialog,
              private reviewService: ReviewService,
              private partnerPostService: PartnerPostService) {
  }

  range(rank: number) {
    return Array(rank - (rank % 1));
  }

  ngOnInit() {
    let courseId;
    this.userService.getUser().then((user: UserProfile) => {
      this.route.queryParams.subscribe(
        params => {
          this.postType = params.tab ? params.tab : PostType.QUESTION;
          courseId = params.courseId;
          const routingData = this.routingDataService.getRoutingData(courseId);
          this.user = user;
          if (routingData) {
            this.uiCourse = routingData.getData();
            this._checkMyCourses();
            this.initialDataLoaded = true;
          }
          // this.courseReviewId = params.reviewId ? params.reviewId : undefined;
          this.courseService.getCourse(courseId).subscribe((course: any) => {
            this.course = Course.deserialize(course);
            this.starsCounter = new StarsCounter(this.course.rank);
            if (!this.uiCourse) {
              this.uiCourse = this.course.uiCourse;
              this._checkMyCourses();
              this.initialDataLoaded = true;
            }
            this.courseDataLoaded = true;
          });
        }
      );
    });
  }

  private _checkMyCourses() {
    this.isInMyCourses = this.user.myCourses.map((uiCourse: UiCourse) => {
      return uiCourse.id;
    }).includes(this.uiCourse.id);
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
      case 'hours': {
        this.router.navigate(['/change-hours-editor']);
        break;
      }
    }
  }

  addToMyCourses(id: string) {
    this.isInMyCourses = true;
    this.user.myCourses.push(this.uiCourse);
    this._updateMyCourses();
  }

  removeFromMyCourses(id: string) {
    this.isInMyCourses = false;
    const index = this.user.myCourses.map((uiCourse: UiCourse) => uiCourse.id)
      .indexOf(this.uiCourse.id, 0);
    if (index > -1) {
      this.user.myCourses.splice(index, 1);
    }
    this._updateMyCourses();
  }

  copyEmail(post: CourseRelatedPost) {
    this.clipboardService.copyFromContent(post.owner.email);
    this.snackBar.open('Email copied to clipboard', '', {
      duration: 2000 // Prompt the toast 2 seconds.
    });
  }

  private _updateMyCourses() {
    this.userService.updateMyCourses(this.user, this.uiCourse.id).subscribe(() => {});
  }

  tryDelete(post: any, isPartnerPost: boolean, isReview: boolean) { // if isPartnerPost = false than this is change hour post
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: ('Remove ' + (isReview ? 'Review' : 'Post')),
      text: 'Are you sure you want to delete this ' + (isReview ? 'review' : 'post') +
        '? It will be no longer exist'};
    this.dialog.open(DeleteConfirmDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: boolean) => {
        if (result) {
          if (isReview) {
            this.reviewService.deleteReview(post.id).subscribe();
            const index = this.course.reviews.indexOf(post, 0);
            if (index > -1) {
              this.course.reviews.splice(index, 1);
            }
          } else {
            // delete post
            this.partnerPostService.deletePartnerPost(post.id, isPartnerPost).subscribe();
            if (isPartnerPost) {
              const index = this.course.partnerPosts.indexOf(post, 0);
              if (index > -1) {
                this.course.partnerPosts.splice(index, 1);
              }
            } else { // changeHourPost
              const index = this.course.changeHours.indexOf(post, 0);
              if (index > -1) {
                this.course.changeHours.splice(index, 1);
              }
            }
          }

          this.snackBar.open('Post Successfully Deleted', '', {
            duration: 2000 // Prompt the toast 2 seconds.
          });
        }
      }
    );
  }
}
