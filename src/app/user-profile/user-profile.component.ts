import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';
import {Question, QuestionNavigationData} from '../models/question.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DeleteConfirmDialogComponent} from '../delete-confirm-dialog/delete-confirm-dialog.component';
import {PartnerPostService} from '../services/partner-post.service';
import {ReviewService} from '../services/review.service';
import {UiCourse} from '../models/ui-course.model';
import {CoursesComponent} from '../courses/courses.component';
import {InitialDetailsDialogComponent} from '../initial-details-dialog/initial-details-dialog.component';
import {ProgramService} from '../services/program.service';
import {ImageUploadService} from '../services/image-upload.service';
import {CourseService} from '../services/course.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails: UserProfile;
  isLoaded = false;
  cumulativeLength = 0;
  uiCoursesMap: UiCoursesMap;

  constructor(private userService: UserService,
              private partnerPostService: PartnerPostService,
              private routingDataService: AppRoutingDataService,
              private reviewService: ReviewService,
              private router: Router,
              private courseService: CourseService,
              private programService: ProgramService,
              private imageUploadService: ImageUploadService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.userService.getUser(true).then((user: UserProfile) => {
      this.userDetails = user;
      this.cumulativeLength = this.userDetails.myCourseReviews.length +
        this.userDetails.myPartnerPosts.length + this.userDetails.myChangeHoursPosts.length;
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }

  navigateToQuestionPage(question: Question) {
    this.routingDataService.setRoutingData('question', new QuestionNavigationData(question));
    this.router.navigate(['question-page'], {queryParams: {id: question.id}});
  }

  tryDeletePost(post: any, isPartnerPost: boolean, isReview: boolean) { // if isPartnerPost = false than this is change hour post
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
            const index = this.userDetails.myCourseReviews.indexOf(post, 0);
            if (index > -1) {
              this.userDetails.myCourseReviews.splice(index, 1);
            }
          } else {
            // delete post
            this.partnerPostService.deletePartnerPost(post.id, isPartnerPost).subscribe();
            if (isPartnerPost) {
              const index = this.userDetails.myPartnerPosts.indexOf(post, 0);
              if (index > -1) {
                this.userDetails.myPartnerPosts.splice(index, 1);
              }
            } else { // changeHourPost
              const index = this.userDetails.myChangeHoursPosts.indexOf(post, 0);
              if (index > -1) {
                this.userDetails.myChangeHoursPosts.splice(index, 1);
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

  range(rank: number) {
    return Array(rank - (rank % 1));
  }

  navigateToCoursePage(course: UiCourse) {
    const courseData = new CoursesComponent.CourseNavigationData(course);
    this.routingDataService.setRoutingData(course.courseNumber, courseData);
    this.router.navigate(['/course-page'], { queryParams: { courseId: course.courseNumber } });
  }

  async editProfile() {
    const programs = await this.programService.getPrograms();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Customize Your Information', user: this.userDetails,
      selectedProgram: this.userDetails.program, description: this.userDetails.description,
      selectedSkills: this.userDetails.skills.map(skill => skill.name),
      firstInit: false, programs: programs, image: this.userDetails.image};
    await this.courseService.waitForCourses();
    this._initCourses();
    this.dialog.open(InitialDetailsDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        if (!result) {
          return;
        }
        this.userDetails.image = result.imageSrc;
        this.userDetails.program = result.program;
        this.userDetails.description = result.description;
        this._addUserSkills(result.skills);
        this.userDetails.isNewUser = false;
        this.imageUploadService.uploadImage(result.image).subscribe((imageUrl: string) => {
          if (imageUrl) {
            this.userDetails.image = imageUrl;
          }
          this.userService.updateUserDetails(this.userDetails).subscribe(() => {
            this._toast('User details updated');
          });
        });
      }
    );
  }
  private _toast(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 2000 // Prompt the toast 2 seconds.
    });
  }
  private _addUserSkills(skills: string[]) {
    this.userDetails.skills = [];
    skills.forEach(skillName => {
      this.userDetails.skills.push(this.uiCoursesMap[skillName]);
    });
  }

  private _initCourses(): void {
    if (!this.uiCoursesMap) {
      this.uiCoursesMap = this.courseService.getCoursesMap();
    }
  }
}
