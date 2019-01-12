let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const ChangeHoursPostSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
  timestamp: Date,//TimeFormat,
  isLocked: Boolean
});

ChangeHoursPostSchema.plugin(mongoosePaginate);
const ChangeHoursPost  = mongoose.model('ChangeHoursPost', ChangeHoursPostSchema );

module.exports = ChangeHoursPost;
