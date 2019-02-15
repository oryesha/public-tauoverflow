import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';
import {Question, QuestionNavigationData} from '../models/question.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {DeleteConfirmDialogComponent} from '../delete-confirm-dialog/delete-confirm-dialog.component';
import {PartnerPostService} from '../services/partner-post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails: UserProfile;
  isLoaded = false;
  cumulativeLength = 0;

  constructor(private userService: UserService,
              private partnerPostService: PartnerPostService,
              private routingDataService: AppRoutingDataService,
              private router: Router,
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

  tryDeletePost(post: any, isPartnerPost: boolean) { // if isPartnerPost = false than this is change hour post
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Remove Post', text: 'Are you sure you want to delete this post? It will be no longer exist'};
    this.dialog.open(DeleteConfirmDialogComponent, dialogConfig).afterClosed().subscribe(
      (result: boolean) => {
        if (result) {
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
}
