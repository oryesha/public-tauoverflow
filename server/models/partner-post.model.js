let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const PartnerPostSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
  timestamp: Date,//TimeFormat,
  isLocked: Boolean
});

PartnerPostSchema.plugin(mongoosePaginate);
const PartnerPost  = mongoose.model('PartnerPost', PartnerPostSchema );

module.exports = PartnerPost;
