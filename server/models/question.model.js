let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let UserProfile = require('./user-profile.model');
let Course = require('./course.model');
let Answer = require('./answer.model');
let Upvote = require('./upvote.model');

const QuestionSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: UserProfile,
  timeStamp: Date,//TimeFormat,
  isLocked: Boolean,
  relatedCourses: [Course],
  answers: [Answer],
  upvote: Upvote
});

QuestionSchema.plugin(mongoosePaginate);
const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
