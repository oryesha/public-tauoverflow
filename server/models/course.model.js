let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


const CourseSchema = new mongoose.Schema({
  name: String,
  courseId: String,
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseReview'}],
  partnerPosts: [{type: mongoose.schema.Types.ObjectId, ref: 'PartnerPost'}],
  changeHours: [{type: mongoose.schema.Types.ObjectId, ref: 'ChangeHoursPost'}],
  rank: Number
});

CourseSchema .plugin(mongoosePaginate);
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
