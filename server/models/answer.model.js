let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const AnswerSchema = new mongoose.Schema({
  content: String,
  upvote: {
    count: Number,
    upvoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}]
  },
  timeStamp: Date,//TimeFormat,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  questionId: String
});

AnswerSchema.plugin(mongoosePaginate);
const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
