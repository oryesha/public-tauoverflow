import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material';
import {MatListModule} from '@angular/material';
import {MatChipsModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth/auth.service';
import { QuestionService } from './services/question.service';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';
import {ProfileDetailsComponent} from './profile-details/profile-details.component';
import {HomePageComponent} from './home-page/home-page.component';
import { CoursesComponent } from './courses/courses.component';
import {CoursePageComponent} from './course-page/course-page.component';
import {AnswerEditorComponent} from './answer-editor/answer-editor.component';
import {SearchBarComponent} from './search-bar/search-bar.component';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { QuestionEditorComponent } from './question-editor/question-editor.component';
import { FormFieldComponent } from './form-field/form-field.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { QuestionCardComponent } from './question-card/question-card.component';
import { AnswerCardComponent } from './answer-card/answer-card.component';
import { FindAPartnerEditorComponent } from './find-a-partner-editor/find-a-partner-editor.component';
import { CourseReviewEditorComponent } from './course-review-editor/course-review-editor.component';
import { SingleAnswerEditorComponent } from './single-answer-editor/single-answer-editor.component';
import {AppService} from './app.service';
import { PostEditorComponent } from './post-editor/post-editor.component';
import { MultiSelectAutocompleteComponent } from './multi-select-autocomplete/multi-select-autocomplete.component';
import {AppRoutingDataService} from './app-routing-data.service';
import {UserService} from './services/user.service';
import {AuthGuard} from './services/auth/auth.guard';
import { InitialDetailsDialogComponent } from './initial-details-dialog/initial-details-dialog.component';
import {HttpRequestsService} from './services/http-requests.service';
import {CourseService} from './services/course.service';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpComponent,
    AutocompleteComponent,
    ProfileDetailsComponent,
    HomePageComponent,
    CoursePageComponent,
    AnswerEditorComponent,
    SearchBarComponent,
    FilterDialogComponent,
    QuestionEditorComponent,
    FormFieldComponent,
    CoursesComponent,
    UserProfileComponent,
    SearchResultsComponent,
    QuestionPageComponent,
    QuestionCardComponent,
    AnswerCardComponent,
    FindAPartnerEditorComponent,
    CourseReviewEditorComponent,
    SingleAnswerEditorComponent,
    PostEditorComponent,
    MultiSelectAutocompleteComponent,
    InitialDetailsDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule,
    MatListModule,
    MatChipsModule,
    MatSelectModule,
    MatDialogModule,
    AngularEditorModule,
    HttpClientModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

  ],
  providers: [
    QuestionService,
    AuthService,
    AppService,
    AppRoutingDataService,
    UserService,
    AuthGuard,
    HttpRequestsService,
    CourseService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FilterDialogComponent,
    InitialDetailsDialogComponent
  ]
})
export class AppModule {
}
