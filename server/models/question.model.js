let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const QuestionSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  timeStamp: Date,//TimeFormat,
  isLocked: Boolean,
  relatedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
  upvote: {
    count: Number,
    upvoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}]
  }
});

QuestionSchema.plugin(mongoosePaginate);
const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
