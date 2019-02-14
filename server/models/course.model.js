let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


const CourseSchema = new mongoose.Schema({
  name: String,
  courseNumber: {type: String, index: true},
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
  reviews: [{type: mongoose.Schema.Types.ObjectId, ref: 'CourseReview'}],
  partnerPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'PartnerPost'}],
  changeHours: [{type: mongoose.Schema.Types.ObjectId, ref: 'ChangeHoursPost'}],
  interestedIn: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}],
});

CourseSchema .plugin(mongoosePaginate);
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
