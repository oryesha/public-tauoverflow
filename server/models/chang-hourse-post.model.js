let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let PostSchema = require('./post.model');

const ChangeHoursPostSchema = new mongoose.Schema(PostSchema);

ChangeHoursPostSchema.plugin(mongoosePaginate);
const ChangeHoursPost  = mongoose.model('changeHoursPost', ChangeHoursPostSchema );

module.exports = ChangeHoursPost;
