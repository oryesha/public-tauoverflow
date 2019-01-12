let ChangeHoursService = require('../services/change-hours.service')

exports.getAllChangeHours = async function(req,res){
  try{
    let changeHours = await ChangeHoursService.getAllChangeHours({});
    return res.status(200).json({status: 200, data: changeHours, message: "Succesfully changeHours Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: "WOW " + e.message});
  }
};

exports.createPost = async function(req,res){

  let post = {
    subject: req.body.subject,
    content: req.body.content,
    owner: req.body.owner,
    course: req.body.course,
    timestamp: req.body.date,
    isLocked: req.body.isLocked
  };

  try{
    let createdPost = await ChangeHoursService.createChangeHoursPost(post);
    return res.status(200).json({status: 200, data: createdPost, message: "Succesfully Created Change Hours Post"})
  }catch(e){
    return res.status(400).json({status: 400, message: "Change Hours Post Creation was Unsuccesfull"})
  }
};
