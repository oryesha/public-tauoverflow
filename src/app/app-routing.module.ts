import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CoursesComponent} from './courses/courses.component';
import {QuestionEditorComponent} from './question-editor/question-editor.component';
import {CoursePageComponent} from './course-page/course-page.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {QuestionPageComponent} from './question-page/question-page.component';
import {FindAPartnerEditorComponent} from './find-a-partner-editor/find-a-partner-editor.component';
import {ChangeHoursEditorComponent} from './change-hours-editor/change-hours-editor.component';
import {CourseReviewEditorComponent} from './course-review-editor/course-review-editor.component';
import {AuthGuard} from './services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'Sign Up'}
  },
  {
    path: 'home-page',
    component: HomePageComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'Home Page'}
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'Course Page'}
  },
  {
    path: 'question-editor',
    component: QuestionEditorComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'QuestionEditor'}
  },
  {
    path: 'course-page',
    component: CoursePageComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'Course Page'}
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'User Profile'}
  },
  {
    path: 'find-a-partner-editor',
    component: FindAPartnerEditorComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'Find A Partner Editor'}
  },
  {
    path: 'course-review-editor',
    component: CourseReviewEditorComponent,
    canActivate: [AuthGuard],
    data: {pageTitle: 'Course Review Editor'}
  },
  {
    path: 'change-hours-editor',
    component: ChangeHoursEditorComponent,
    data: {pageTitle: 'Change Hours Editor'}
  },
  {
    path: 'question-page',
    component: QuestionPageComponent,
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    data: {pageTitle: 'Question Page'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
