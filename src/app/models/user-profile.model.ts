import {Course} from './course.model';
import {Name} from './name.model';
import {UiCourse} from './ui-course.model';
import {Question} from './question.model';
import {PartnerPost} from './partner-post.model';
import {CourseReview} from './course-review.model';
import {ChangeHoursPost} from './change-hours-post.model';
import {UiUser} from './ui-user.model';
import {Answer} from './answer.model';

export class UserProfile {
  id: string;
  firebaseToken: string;
  name: Name;
  program = '';
  email: string;
  rank = 0;
  image = '';
  asked = 0;
  answered = 0;
  description = '';
  skills: UiCourse[] = [];
  favorites: Question[] = [];
  myQuestions: Question[] = [];
  myAnswers: Answer[] = [];
  myPartnerPosts: PartnerPost[] = [];
  myChangeHoursPosts: ChangeHoursPost[] = [];
  myCourseReviews: CourseReview[] = [];
  myCourses: UiCourse[] = [];
  isNewUser = true;

  static deserialize(user: any): UserProfile {
    const userProfile = new UserProfile(user.firebaseToken, user.firstName, user.lastName, user.email,
      false, user._id, user.program, user.rank, user.image, user.myQuestions.length, user.myAnswers.length, user.description);
    user.skills.forEach((dbSkill) => {
      userProfile.skills.push(new UiCourse(dbSkill._id, dbSkill.name, dbSkill.courseNumber));
    });
    user.favorites.forEach((dbFavorite) => {
      const favorite = Question.deserialize(dbFavorite);
      userProfile.favorites.push(favorite);
    });
    user.myQuestions.forEach((dbQuestion) => {
      const question = Question.deserialize(dbQuestion);
      userProfile.myQuestions.push(question);
    });
    user.myPartnerPosts.forEach((dbPartnerPost) => {
      const partnerPost = PartnerPost.deserialize(dbPartnerPost);
      userProfile.myPartnerPosts.push(partnerPost);
    });
    user.myChangeHoursPosts.forEach((dbChangeHour) => {
      const changeHour = ChangeHoursPost.deserialize(dbChangeHour);
      userProfile.myChangeHoursPosts.push(changeHour);
    });
    user.myCourseReviews.forEach((dbCourseReview) => {
      const courseReview = CourseReview.deserialize(dbCourseReview);
      userProfile.myCourseReviews.push(courseReview);
    });
    user.myCourses.forEach((dbMyCourse) => {
      userProfile.myCourses.push(new UiCourse(dbMyCourse._id, dbMyCourse.name, dbMyCourse.courseNumber));
    });
    return userProfile;
  }

  constructor(token: string, firstName: string, lastName: string,
              email: string, isNewUser?: boolean, id?: string, program?: string,
              rank?: number, image?: string, asked?: number, answered?: number,
              description?: string) {
    this.firebaseToken = token;
    this.name = new Name(firstName, lastName);
    this.email = email;
    this.isNewUser = isNewUser;
    if (id) {
      this.id = id;
      this.program = program;
      this.rank = rank;
      this.image = image;
      this.description = description;
      this.asked = asked;
      this.answered = answered;
    }
  }

  getUiUser(): UiUser {
    return new UiUser(this.name.first, this.name.last, this.firebaseToken, this.email, this.id, this.image,
      this.program, this.rank, this.description, this.skills);
  }
}
