import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CoursesComponent} from './courses/courses.component';
import {AnswerEditorComponent} from './answer-editor/answer-editor.component';
import {QuestionEditorComponent} from './question-editor/question-editor.component';
import {CoursePageComponent} from './course-page/course-page.component';
import {SearchResultsComponent} from './search-results/search-results.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {QuestionPageComponent} from './question-page/question-page.component';
import {FindAPartnerEditorComponent} from './find-a-partner-editor/find-a-partner-editor.component';
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
    data: {pageTitle: 'Home Page'}
  },
  {
    path: 'courses',
    component: CoursesComponent,
    data: {pageTitle: 'Course Page'}
  },
  {
    path: 'answer-editor',
    component: AnswerEditorComponent,
    data: {pageTitle: 'Answer Editor'}
  },
  {
    path: 'question-editor',
    component: QuestionEditorComponent,
    data: {pageTitle: 'QuestionEditor'}
  },
  {
    path: 'course',
    component: CoursePageComponent,
    data: {pageTitle: 'Course Page'}
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: {pageTitle: 'User Profile'}
  },
  {
    path: 'search-results',
    component: SearchResultsComponent,
    data: {pageTitle: 'Search Results'}
  },
  {
    path: 'find-a-partner-editor',
    component: FindAPartnerEditorComponent,
    data: {pageTitle: 'Find A Partner Editor'}
  },
  {
    path: 'course-review-editor',
    component: CourseReviewEditorComponent,
    data: {pageTitle: 'Course Review Editor'}
  },
  {
    path: 'question-page',
    component: QuestionPageComponent,
    data: {pageTitle: 'Question Page'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
