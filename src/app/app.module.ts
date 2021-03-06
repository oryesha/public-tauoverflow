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
import {MatMenuModule} from '@angular/material/menu';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {HttpClientModule} from '@angular/common/http';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import { ClipboardModule } from 'ngx-clipboard';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {KatexComponent, KatexModule} from 'ng-katex';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireMessagingModule} from 'angularfire2/messaging';
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
import {AnswerService} from './services/answer.service';
import {ReviewService} from './services/review.service';
import {PartnerPostService} from './services/partner-post.service';
import { SpinnerComponent } from './spinner/spinner.component';
import {MessagingService} from './services/messaging.service';
import { AsyncPipe } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { CopyToClipboardComponent } from './copy-to-clipboard/copy-to-clipboard.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { ProfileDetailsDialogComponent } from './profile-details-dialog/profile-details-dialog.component';
import { ClickableProfilePictureComponent } from './clickable-profile-picture/clickable-profile-picture.component';
import { NotificationsCardComponent } from './notifications-card/notifications-card.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationHostDirective } from './notifications-card/notification-host.directive';
import { NotificationSettingsDialogComponent } from './notification-settings-dialog/notification-settings-dialog.component';
import { EditorComponent } from './editor/editor.component';
import {KatexService} from 'ng-katex/src/ng-katex.service';
import { ChangeHoursEditorComponent } from './change-hours-editor/change-hours-editor.component';
import {ChangeHoursPostService} from './services/change-hours-post.service';
import { EditQuestionDialogComponent } from './edit-question-dialog/edit-question-dialog.component';
import { ResetPasswordDialogComponentComponent } from './reset-password-dialog-component/reset-password-dialog-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignUpComponent,
    AutocompleteComponent,
    ProfileDetailsComponent,
    HomePageComponent,
    CoursePageComponent,
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
    SpinnerComponent,
    FileUploaderComponent,
    CopyToClipboardComponent,
    EmptyStateComponent,
    DeleteConfirmDialogComponent,
    ProfileDetailsDialogComponent,
    ClickableProfilePictureComponent,
    NotificationsCardComponent,
    NotificationComponent,
    NotificationHostDirective,
    NotificationSettingsDialogComponent,
    EditorComponent,
    ChangeHoursEditorComponent,
    EditQuestionDialogComponent,
    ResetPasswordDialogComponentComponent,
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
    MatExpansionModule,
    MatButtonToggleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    MatBadgeModule,
    ClipboardModule,
    MatMenuModule,
    MatSlideToggleModule,
    KatexModule,
  ],
  providers: [
    QuestionService,
    AnswerService,
    ReviewService,
    PartnerPostService,
    AuthService,
    AppService,
    AppRoutingDataService,
    UserService,
    AuthGuard,
    HttpRequestsService,
    CourseService,
    MessagingService,
    KatexService,
    ChangeHoursPostService,
    AsyncPipe
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    FilterDialogComponent,
    DeleteConfirmDialogComponent,
    InitialDetailsDialogComponent,
    ProfileDetailsDialogComponent,
    NotificationComponent,
    NotificationSettingsDialogComponent,
    EditQuestionDialogComponent,
    ResetPasswordDialogComponentComponent,
  ]
})
export class AppModule {
}
