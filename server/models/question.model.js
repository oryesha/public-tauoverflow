let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


let QuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: String,
  courses: [String],
  owner: String
});

QuestionSchema.plugin(mongoosePaginate);
const Question = mongoose.model('question', QuestionSchema);

module.exports = Question;
