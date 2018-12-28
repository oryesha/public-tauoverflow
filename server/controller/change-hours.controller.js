let ChangeHoursService = require('../services/change-hours.service')

exports.createPost = async function(req,res){

  let post = {
    subject: req.body.subject,
    content: req.body.content,
    owner: req.body.owner,
    course: req.body.course,
    timeStamp: req.body.date,
    isLocked: req.body.isLocked
  };

  try{
    let createdPost = await ChangeHoursService.createChangeHoursPost(post);
    return res.status(200).json({status: 200, data: createdPost, message: "Succesfully Created Change Hours Post"})
  }catch(e){
    return res.status(400).json({status: 400, message: "Change Hours Post Creation was Unsuccesfull"})
  }
};
