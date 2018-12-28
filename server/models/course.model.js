let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Question = require('./question.model');
let CourseReview = require('./course-review.model');
let PartnerPost = require('./partner-post.model');
let ChangeHoursPost = require('./chang-hourse-post.model');


const CourseSchema = new mongoose.Schema({
  name: String,
  courseId: String,
  questions: [{type: mongoose.Schema.Typse.ObjectId, ref: 'question'}],
  reviews: [CourseReview],
  partnerPosts: [PartnerPost],
  changeHours: [ChangeHoursPost],
  rank: Number
});

CourseSchema .plugin(mongoosePaginate);
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
