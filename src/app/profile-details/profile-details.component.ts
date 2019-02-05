import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {CoursesComponent} from '../courses/courses.component';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  @Input() isProfilePage = false;
  @Input() isDetailsDialog = false;
  @Input() classes: string;
  @Input() userToDisplay: UserProfile;
  isLoaded = false;
  userDetails: UserProfile;
  defaultImage = '../../assets/avatar.png';

  constructor(private appService: AppService,
              private router: Router,
              private userService: UserService,
              private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
    if (this.isDetailsDialog) {
      this.userDetails = this.userToDisplay;
      this.isLoaded = true;
      return;
    }
    const routingData = this.routingDataService.getRoutingData('user');
    if (routingData) {
      this.userDetails = routingData.getData();
      this.isLoaded = true;
    } else {
      this.userService.getUser()
        .then((user: UserProfile) => {
          this.userDetails = user;
          this.isLoaded = true;
        });
    }
  }

  navigateToCoursePage(course: UiCourse) {
    const courseData = new CoursesComponent.CourseNavigationData(course);
    this.routingDataService.setRoutingData(course.courseNumber, courseData);
    this.router.navigate(['/course-page'], { queryParams: { courseId: course.courseNumber } });
  }

  addSkill() {

  }
}
