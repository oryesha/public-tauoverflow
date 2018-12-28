let PartnerPost = require('../models/partner-post.model');
_this = this;


exports.createPartnerPost = async function(partnerPost){
  let newPartnerPost = new PartnerPost({
    subject: partnerPost.subject,
    content: partnerPost.content,
    owner: partnerPost.owner,
    course: partnerPost.course,
    timeStamp: partnerPost.timeStamp,//TimeFormat,
    isLocked: partnerPost.isLocked
  });

  try{
    let savedPartnerPost = await newPartnerPost.save();
    savedPartnerPost.populate('course','partnerPosts').exec(
      function(savedPartnerPost){
        savedPartnerPost.course.partnerPosts.push(savedPartnerPost);
        savedPartnerPost.course.save();
      });
    return savedPartnerPost;
  }catch(e){
    throw Error("Error while Creating partner-post")
  }
};



