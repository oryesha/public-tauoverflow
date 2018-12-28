let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const UpvoteSchema = new mongoose.Schema({
  count: Number,
  upvoters: [String]
});

UpvoteSchema.plugin(mongoosePaginate);
const Upvote = mongoose.model('Uptove', UpvoteSchema);

module.exports = Upvote;
