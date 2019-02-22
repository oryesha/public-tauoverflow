let ChangeHoursService = require('../services/change-hours-post.service');

exports.getAllChangeHours = async function(req,res){
  try{
    let changeHours = await ChangeHoursService.getAllChangeHours({});
    return res.status(200).json({status: 200, data: changeHours, message: "Succesfully changeHours Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: "WOW " + e.message});
  }
};

exports.createChangeHoursPost = async function(req,res){

  let post = {
    subject: req.body.subject,
    content: req.body.content,
    owner: req.body.owner,
    course: req.body.uiCourse,
    timestamp: req.body.timestamp,
    isLocked: req.body.isLocked
  };

  try{
    let createdChangeHoursPost = await ChangeHoursService.createChangeHoursPost(post);
    return res.status(200).json({status: 200, data: createdChangeHoursPost, message: "Succesfully Created Change Hours Post"})
  }catch(e){
    return res.status(400).json({status: 400, message: "Change Hours Post Creation was Unsuccessful: " + e})
  }
};

exports.deleteChangeHoursPost = async function(req,res) {
  let id = req.params.id;
  try {
    let deleted = await ChangeHoursService.deleteChangeHoursPost(id);
    return res.status(200).json({status: 200, message: "Succesfully Deleted Post"})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};
