let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let UserProfile = require('./user-profile.model');

const PostSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: UserProfile,
  timeStamp: Date,//TimeFormat,
  isLocked: Boolean
});

PostSchema.plugin(mongoosePaginate);
const Post = mongoose.model('post', PostSchema);

module.exports = Post;
module.exports = PostSchema;
