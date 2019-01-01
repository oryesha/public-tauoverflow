let PartnerPostService = require('../services/partner-post.service')

exports.getAllPartnerPosts = async function(req,res){
  try{
    let posts = await PartnerPostService.getAllPartnerPosts();
    return res.status(200).json({status: 200, data: posts, message: "Succesfully Partner Posts Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.createPartnerPost = async function(req,res){

  let partnerPost = {
    subject: req.body.subject,
    content: req.body.content,
    owner: req.body.owner,
    course: req.body.course,
    timeStamp: req.body.timeStamp,//TimeFormat,
    isLocked: req.body.isLocked
  };

  try{
    let createdPartnerPost = await PartnerPostService.createPartnerPost(partnerPost);
    return res.status(201).json({status: 201, data: createdPartnerPost, message: "Succesfully Created partner-post"})
  }catch(e){
    return res.status(400).json({status: 400, message: "partner-post Creation was Unsuccesfull"})
  }
};