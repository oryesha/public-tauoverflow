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
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [FilterDialogComponent]
})
export class AppModule {
}
