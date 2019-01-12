let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const CourseReviewSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
  timestamp: Date,//TimeFormat,
  isLocked: Boolean,
  rank: Number,
});

CourseReviewSchema.plugin(mongoosePaginate);
const CourseReview = mongoose.model('CourseReview', CourseReviewSchema );

module.exports = CourseReview;
