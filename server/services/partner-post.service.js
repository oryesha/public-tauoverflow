let PartnerPost = require('../models/partner-post.model');
let Course = require('../models/course.model');
let UserProfile = require('../models/user-profile.model');

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
    owner: partnerPost.owner.id,
    course: partnerPost.course.id,
    timeStamp: partnerPost.timeStamp,//TimeFormat,
    isLocked: partnerPost.isLocked
  });

  try{
    let savedPartnerPost = await newPartnerPost.save();
    const user = await UserProfile.findById(newPartnerPost.owner);
    user.myPartnerPosts.push(savedPartnerPost._id);
    user.save();
    const course = await Course.findById(newPartnerPost.course);
    course.partnerPosts.push(savedPartnerPost._id);
    course.save();
    return savedPartnerPost;
  }catch(e){
    throw Error("Error while Creating partner-post")
  }
};



