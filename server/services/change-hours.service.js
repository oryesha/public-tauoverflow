let Post = require('../models/change-hours-post.model');
let UserProfile = require('../models/user-profile.model');
let Course = require('../models/course.model');

_this = this;

exports.getAllChangeHours = async function(query) {
  try {
    let changeHours = await Post.paginate(query);
    return changeHours;
  } catch (e) {
    throw Error('Error while Paginating questions')
  }
};

exports.createChangeHoursPost = async function(post){
  let newPost = new Post({
    subject: post.subject,
    content: post.content,
    owner: post.owner,
    course: post.course,
    timestamp: post.date,//TimeFormat,
    isLocked: post.isLocked
  });

  try{
    let savedPost = await newPost.save();
    const user = await UserProfile.findById(newPost.owner);
    user.myChangeHoursPosts.push(savedPost._id);
    user.save();
    const course = await Course.findById(newPost.course);
    course.partnerPosts.push(savedPost._id);
    course.save();
    return savedPost;
  }catch(e){
    throw Error("Error while Creating Change Hour Post")
  }
};

exports.deleteChangeHoursPost = async function(id){
  try{
    let deleted = await Post.deleteOne({_id: id});
    if(deleted.n === 0){
      throw Error("post Could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error("Error Occured while Deleting the post")
  }
};
