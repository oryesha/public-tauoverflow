let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');

const NotificationSchema = new mongoose.Schema({
  toNotify: String, //notification owner
  subject: String, //subject of question that was asked or answered
  owner: String, //who answered or asked
  timestamp: Date,//TimeFormat,
  isAnswer: Boolean, //can notify on answer or question
  isSeen: Boolean,
  link: String,
});
NotificationSchema.plugin(mongoosePaginate);
const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
