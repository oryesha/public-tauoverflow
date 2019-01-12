import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {UiCourse} from '../models/ui-course.model';
import {UserProfile} from '../models/user-profile.model';
import {UiCoursesMap} from '../models/ui-courses-map.model';
import {UserService} from '../services/user.service';
import {CourseService} from '../services/course.service';
import {Router} from '@angular/router';
import {PartnerPostService} from '../services/partner-post.service';
import {MatSnackBar} from '@angular/material';
import {AppRoutingDataService} from '../app-routing-data.service';
import {PostContent} from '../post-editor/post-editor.component';
import {PartnerPost} from '../models/partner-post.model';

@Component({
  selector: 'app-find-a-partner-editor',
  templateUrl: './find-a-partner-editor.component.html',
  styleUrls: ['./find-a-partner-editor.component.scss']
})
export class FindAPartnerEditorComponent implements OnInit {

  course: UiCourse;
  user: UserProfile;
  coursesMap: UiCoursesMap;
  isCourseChosen = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    height: '15rem',
    minHeight: '3rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    customClasses: [ // optional
      {
        name: 'redText',
        class: 'redText'
      },
    ]
  };

  constructor(private userService: UserService,
              private courseService: CourseService,
              private partnerPostService: PartnerPostService,
              private router: Router,
              private snackBar: MatSnackBar,
              private routingDataService: AppRoutingDataService) {}

  ngOnInit() {
    const courses = this.routingDataService.getRoutingData('selectedCourses').getData();
    if (courses) {
      this.isCourseChosen = true;
      this.course = courses[0];
    }
    this.userService.getUser().then((user: UserProfile) => {
      this.user = user;
    });
    this.coursesMap = this.courseService.getCoursesMap();
  }

  postPartnerFind(event: PostContent) {
    const subject = event.subject;
    const content = event.content;
    const partnerPost = new PartnerPost(subject, content, this.user, this.course);
    this.partnerPostService.createPartnerPost(partnerPost).subscribe((response: any) => {
      partnerPost.id = response.data._id;
      this.snackBar.open(this.course.name + ' Partner Post Added!', '', {
        duration: 2000 // Prompt the toast 2 seconds.
      });
      this.router.navigate(['course-page'], {queryParams: {courseId: this.course.courseNumber}});
    });
  }

}
