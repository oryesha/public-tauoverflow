let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let UserProfile = require('./user-profile.model');
let Upvote = require('./upvote.model');

const AnswerSchema = new mongoose.Schema({
  content: String,
  upvote: Upvote,
  timeStamp: Date,//TimeFormat,
  owner: UserProfile,
  questionId: String
});

AnswerSchema.plugin(mongoosePaginate);
const Answer = mongoose.model('answer', AnswerSchema);

module.exports = Answer;
