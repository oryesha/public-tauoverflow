let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let UserProfile = require('./user-profile.model');

const ChangeHoursPostSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: UserProfile,
  timeStamp: Date,//TimeFormat,
  isLocked: Boolean
});

ChangeHoursPostSchema.plugin(mongoosePaginate);
const ChangeHoursPost  = mongoose.model('ChangeHoursPost', ChangeHoursPostSchema );

module.exports = ChangeHoursPost;
