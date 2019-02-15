let NotificationService = require('../services/notification.service');

exports.getUserNotifications = async function(req,res){
  let id = req.params.id; //this is firebase id !!!
  try {
    let notifications = await NotificationService.getUserNotifications(id);
    return res.status(200).json({status: 200, data: notifications, message: "Succesfully recieved notifications"})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};

exports.addNotification = async function(req,res){

  let notification = {
    toNotify: req.params.id,
    subject: req.body.subject,
    owner: req.body.owner,
    timestamp: req.body.timestamp,//TimeFormat,
    isAnswer: req.body.isAnswer,
    isSeen: req.body.isSeen,
    questionId: req.body.questionId
  };

  try{
    let added = await NotificationService.addNotification(notification);
    return res.status(201).json({status: 201, data: added, message: "Succesfully Created notification"})
  }catch(e){
    return res.status(400).json({status: 400, message: "notification Creation was Unsuccesfull"})
  }
};

exports.deleteNotification = async function(req,res) {
  let id = req.params.id;
  try {
    let deleted = await NotificationService.deleteNotification(id);
    return res.status(200).json({status: 200, message: "Succesfully Deleted Notification"})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};

exports.updateNotification = async function(req,res) {
  if(!req.body.id || !req.body.isSeen){
    return res.status(400).json({status: 400, message: "all params must be present"})
  }
  let id = req.body.id;
  let isSeen = req.body.isSeen;
  try {
    await NotificationService.updateNotification(id, isSeen);
    return res.status(200).json({status: 200, message: "Succesfully Updated Notification"})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};
