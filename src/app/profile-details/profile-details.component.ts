import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {Course} from '../models/course.model';
import {CoursesComponent} from '../courses/courses.component';
import {AppRoutingDataService, RoutingData} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  @Input() isProfilePage = false;
  @Input() classes: string;
  isLoaded = false;
  userDetails: {
    name: { first: string, last: string };
    program: string;
    profilePicturePath: string;
    rank: number;
    // asked: number;
    // answered: number;
    description: string;
    skills: Course[];
  };

  constructor(private appService: AppService,
              private router: Router,
              private userService: UserService,
              private routingDataService: AppRoutingDataService) {
    // this.userService.
    appService.getResponse('userDetails').subscribe((response) => {
      this.userDetails = response;
      this.isLoaded = true;
    });
    // debugger;
  }

  ngOnInit() {
  }

  navigateToCoursePage(course: UiCourse) {
    const courseData = new CoursesComponent.CourseNavigationData(course);
    this.routingDataService.setRoutingData(course.courseId, courseData);
    this.router.navigate(['/course-page'], { queryParams: { courseId: course.courseId } });
  }
}
