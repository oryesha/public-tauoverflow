let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const UserProfileSchema = new mongoose.Schema({
  firebaseToken: {type: String, index: true},
  firstName: String,
  lastName: String,
  program: String,
  email: String,
  rank: Number,
  image: String,
  // asked: Number,
  // answered: Number,
  description: String,
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  myQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  myAnswers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
  myCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  myPartnerPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'PartnerPost'}],
  myCourseReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseReview'}],
  myChangeHoursPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChangeHoursPost'}]
});

UserProfileSchema.plugin(mongoosePaginate);
const UserProfile = mongoose.model('UserProfile', UserProfileSchema);

module.exports = UserProfile;
