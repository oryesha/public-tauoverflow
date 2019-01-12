let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const AnswerSchema = new mongoose.Schema({
  content: String,
  upvote: {
    count: Number,
    upvoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}]
  },
  timestamp: Date,//TimeFormat,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'}
});

AnswerSchema.plugin(mongoosePaginate);
const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
