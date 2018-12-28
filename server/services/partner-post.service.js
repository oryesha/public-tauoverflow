let PartnerPost = require('../models/partner-post.model');
_this = this;

exports.getAllPartnerPosts = async function() {
  try {
    let posts = await PartnerPost.paginate();
    return posts;
  } catch (e) {
    throw Error('Error while Paginating partner posts')
  }
};

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
    savedPartnerPost.populate('course').populate('owner').exec(
      function(savedPartnerPost){
        savedPartnerPost.course.partnerPosts.push(savedPartnerPost);
        savedPartnerPost.course.save();
        savedPartnerPost.owner.myPartnerPosts.push(savedPartnerPost);
        savedPartnerPost.owner.save();
      });
    return savedPartnerPost;
  }catch(e){
    throw Error("Error while Creating partner-post")
  }
};



