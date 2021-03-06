import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../app.service';
import {CoursesComponent} from '../courses/courses.component';
import {AppRoutingDataService} from '../app-routing-data.service';
import {Router} from '@angular/router';
import {UiCourse} from '../models/ui-course.model';
import {UserService} from '../services/user.service';
import {UserProfile} from '../models/user-profile.model';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {InitialDetailsDialogComponent} from '../initial-details-dialog/initial-details-dialog.component';
import {CourseService} from '../services/course.service';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {ProgramService} from '../services/program.service';
import {ImageUploadService} from '../services/image-upload.service';


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
              private snackBar: MatSnackBar,
              private courseService: CourseService,
              private programService: ProgramService,
              private dialog: MatDialog,
              private imageUploadService: ImageUploadService,
              private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
    this.userDetails = this.userToDisplay;
    this.getRankTitle();
    this.isLoaded = true;
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
