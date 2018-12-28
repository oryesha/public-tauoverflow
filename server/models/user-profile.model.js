let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Course = require('./course.model');
let Question = require('./question.model');

const UserProfileSchema = new mongoose.Schema({
  id: String,
  firstName: String,
  lastName: String,
  program: String,
  email: String,
  rank: Number,
  image: String,
  asked: Number,
  answered: Number,
  description: String,
  skills: [Course],
  favorites: [String],
  myQuestions: [Question],
  myCourses: [Course]
});

UserProfileSchema.plugin(mongoosePaginate);
const UserProfile = mongoose.model('userProfile', UserProfileSchema);

module.exports = UserProfile;
