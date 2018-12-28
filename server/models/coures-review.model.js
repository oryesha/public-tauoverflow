let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const CourseReviewSchema = new mongoose.Schema({
  RelatedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  Upvote: {
    count: Number,
    upvoters: [String]
  },
  Answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
  CourseName: String,
  Rank: Number,
});

CourseReviewSchema.plugin(mongoosePaginate);
const CourseReview = mongoose.model('CourseReview', CourseReviewSchema );

module.exports = CourseReview;
