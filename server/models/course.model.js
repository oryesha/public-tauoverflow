let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Question = require('./question.model');
let CourseReview = require('./course-review.model');
let PartnerPost = require('./partner-post.model');
let Post = require('./post');


const CourseSchema = new mongoose.Schema({
  name: String,
  courseId: String,
  questions: [Question],
  reviews: [CourseReview],
  partnerPosts: [PartnerPost],
  changeHours: [Post],
  rank: Number
});

CourseSchema .plugin(mongoosePaginate);
const Course = mongoose.model('course', CourseSchema);

module.exports = Course;
