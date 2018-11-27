import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CoursePageComponent} from './course-page/course-page.component';
import {AnswerEditorComponent} from './answer-editor/answer-editor.component';
import {QuestionEditorComponent} from './question-editor/question-editor.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    data: {pageTitle: 'Sign Up'}
  },
  { path: 'home-page',
    component: HomePageComponent,
    data: {pageTitle: 'Home Page'}
  },
  { path: 'course-page',
    component: CoursePageComponent,
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
