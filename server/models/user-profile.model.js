let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const UserProfileSchema = new mongoose.Schema({
  firebaseToken: String,
  firstName: String,
  lastName: String,
  program: String,
  email: String,
  rank: Number,
  image: String,
  asked: Number,
  answered: Number,
  description: String,
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  favorites: [{ body:"string", by: mongoose.Schema.Types.ObjectId }],
  myQuestions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  myCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  myPartnerPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'PartnerPost'}],
  myCourseReviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseReview'}],
  myChangHoursPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChangeHoursPost'}]
});

UserProfileSchema.plugin(mongoosePaginate);
const UserProfile = mongoose.model('userProfile', UserProfileSchema);

module.exports = UserProfile;
