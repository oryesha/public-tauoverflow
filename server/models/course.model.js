let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


const CourseSchema = new mongoose.Schema({
  name: String,
  courseNumber: String,
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseReview'}],
  partnerPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'PartnerPost'}],
  changeHours: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChangeHoursPost'}],
});

CourseSchema .plugin(mongoosePaginate);
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
