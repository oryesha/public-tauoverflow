let UserProfile = require('../models/user-profile.model');
let Notification = require('../models/notification.model');

_this = this;

//get notifications of user by its firebase id
exports.getUserNotifications = async function(id) {
  let notifications = Notification.find({toNotify: id}).sort({timestamp: -1});
  return notifications;
};

exports.addNotification = async function(notification){

  let notifiedUser = await UserProfile.findOne({firebaseToken: notification.toNotify});

  if (filterUserNotification(notifiedUser, notification)) {
    return null;
  }

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
};

function filterUserNotification(notifiedUser, notification) {

  let shouldSkipNotification = false;

  if (notification.isAnswer) {
    const isUsersQuestion = notifiedUser.myQuestions.indexOf(notification.questionId) !== -1;
    if (notifiedUser.notifyOnMyQuestions === false && isUsersQuestion) { //question must be in my questions
      shouldSkipNotification = true;
    }
  }

  return shouldSkipNotification;
};


