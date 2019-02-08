let Notification = require('../models/notification.model');

_this = this;

//get notifications of user by its firebase id
exports.getUserNotifications = async function(id) {
  let notifications = Notification.find({toNotify: id});
  return notifications;
}

exports.addNotification = async function(notification){
  let newNotification = new Notification({
    toNotify: notification.toNotify,
    subject: notification.subject,
    owner: notification.owner,
    timestamp: notification.timestamp,//TimeFormat,
    isAnswer: notification.isAnswer,
    isSeen: notification.isSeen,
    questionId: notification.questionId
  });

  try{
    let savedNotification = await newNotification.save();
    return savedNotification;
  }catch(e){
    throw Error("Error while adding notification")
  }
};

exports.deleteNotification = async function(id){
  try{
    let deleted = await Notification.deleteOne({_id: id});
    if(deleted.n === 0){
      throw Error("notification Could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error("Error Occured while Deleting notification")
  }
};

exports.updateNotification = async function(id, isSeen){
  try {
    await Notification.findByIdAndUpdate(id, { isSeen: isSeen});
  } catch(e){
  throw Error("Error occured while updating notification")
  }
}



