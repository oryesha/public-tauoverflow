let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let UserProfile = require('./user-profile.model');

const PostSchema = new mongoose.Schema({
  subject: String,
  content: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  timeStamp: Date,//TimeFormat,
  isLocked: Boolean
});

PostSchema.plugin(mongoosePaginate);
const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
module.exports = PostSchema;
