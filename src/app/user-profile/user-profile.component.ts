import { Component, OnInit } from '@angular/core';
import {UserProfile} from '../models/user-profile.model';
import {UserService} from '../services/user.service';
import {Question, QuestionNavigationData} from '../models/question.model';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {CourseReview} from '../models/course-review.model';
import {CoursesComponent} from '../courses/courses.component';
import {PostType} from '../models/post.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails: UserProfile;
  isLoaded = false;

  constructor(private userService: UserService,
              private routingDataService: AppRoutingDataService,
              private router: Router) {
    this.userService.getUser().then((user: UserProfile) => {
      this.userDetails = user;
      this.isLoaded = true;
    });
  }

  ngOnInit() {
  }

  navigateToQuestionPage(question: Question) {
    this.routingDataService.setRoutingData('question', new QuestionNavigationData(question));
    this.router.navigate(['question-page'], {queryParams: {id: question.id}});
  }

  range(rank: number) {
    return Array(rank - (rank % 1));
  }
}
