import {ChangeHoursPost} from "../../src/app/models/change-hours-post.model";

let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Question = require('./question.model');
let CourseReview = require('./course-review.model');
let PartnerPost = require('./partner-post.model');
let ChangeHoursPost = require('./chang-hourse-post.model');


const CourseSchema = new mongoose.Schema({
  name: String,
  courseId: String,
  questions: [Question],
  reviews: [CourseReview],
  partnerPosts: [PartnerPost],
  changeHours: [ChangeHoursPost],
  rank: Number
});

CourseSchema .plugin(mongoosePaginate);
const Course = mongoose.model('course', CourseSchema);

module.exports = Course;
