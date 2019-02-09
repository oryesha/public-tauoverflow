import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {CoursesComponent} from '../courses/courses.component';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {InitialDetailsDialogComponent} from '../initial-details-dialog/initial-details-dialog.component';
import {CourseService} from '../services/course.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';


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
  rankTitle: string;
  defaultImage = '../../assets/avatar.png';
  uiCoursesMap: UiCoursesMap;

  constructor(private appService: AppService,
              private router: Router,
              private userService: UserService,
              private courseService: CourseService,
              private dialog: MatDialog,
              private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
    if (this.isDetailsDialog) {
      this.userDetails = this.userToDisplay;
      this.getRankTitle();
      this.isLoaded = true;
      return;
    }
    const routingData = this.routingDataService.getRoutingData('user');
    if (routingData) {
      this.userDetails = routingData.getData();
      this.isLoaded = true;
      this.getRankTitle();
    } else {
      this.userService.getUser()
        .then((user: UserProfile) => {
          this.userDetails = user;
          this.isLoaded = true;
          this.getRankTitle();
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

  async editProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {title: 'Customize Your Information', user: this.userDetails,
      selectedProgram: this.userDetails.program, description: this.userDetails.description,
      selectedSkills: this.userDetails.skills.map(skill => skill.name),
      firstInit: false};
    await this.courseService.waitForCourses();
    this._initCourses();
    this.dialog.open(InitialDetailsDialogComponent, dialogConfig).afterClosed().subscribe(
      result => {
        this.userDetails.program = result.program;
        this.userDetails.description = result.description;
        this._addUserSkills(result.skills);
        this.userDetails.isNewUser = false;
        this.userService.updateUserDetails(this.userDetails).subscribe(() => {
        });
      }
    );
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

  getRankTitle() {
    const rank = this.userDetails.rank;
    if (rank < 100) {
      this.rankTitle = 'babys-room';
    } else if (rank < 500) {
      this.rankTitle = 'lego-head';
    } else if (rank < 700) {
      this.rankTitle = 'bot';
    } else if (rank < 1000) {
      this.rankTitle = 'rocket';
    } else {
      this.rankTitle = 'iron-man';
    }
  }
}
