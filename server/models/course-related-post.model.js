let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let PostSchema = require('./post.model');

const CourseRelatedPostSchema = new mongoose.Schema(PostSchema);
CourseRelatedPostSchema.add({courseName: String});
CourseRelatedPostSchema.plugin(mongoosePaginate);
const CourseRelatedPost = mongoose.model('courseRelatedPost', CourseRelatedPostSchema);

module.exports = CourseRelatedPost;

