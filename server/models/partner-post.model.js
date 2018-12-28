let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let UserProfile = require('./user-profile.model');

const PartnerPostSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: UserProfile,
  timeStamp: Date,//TimeFormat,
  isLocked: Boolean
});

PartnerPostSchema.plugin(mongoosePaginate);
const PartnerPost  = mongoose.model('partnerPost', PartnerPostSchema );

module.exports = PartnerPost;
