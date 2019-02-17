let ChangeHoursPost = require('../models/change-hours-post.model');
let Course = require('../models/course.model');
let UserProfile = require('../models/user-profile.model');

_this = this;

exports.getAllChangeHoursPosts = async function() {
  try {
    let posts = await ChangeHoursPost.paginate();
    return posts;
  } catch (e) {
    throw Error('Error while Paginating change hours posts')
  }
};

exports.createChangeHoursPost = async function(changeHoursPost){
  let newChangeHoursPost = new ChangeHoursPost({
    subject: changeHoursPost.subject,
    content: changeHoursPost.content,
    owner: changeHoursPost.owner.id,
    course: changeHoursPost.course.id,
    timestamp: changeHoursPost.timestamp,//TimeFormat,
    isLocked: changeHoursPost.isLocked
  });

  try {
    let savedChangeHoursPost = await newChangeHoursPost.save();
    const user = await UserProfile.findById(newChangeHoursPost.owner);
    user.myChangeHoursPosts.push(savedChangeHoursPost._id);
    user.save();
    const course = await Course.findById(newChangeHoursPost.course);
    course.changeHours.push(savedChangeHoursPost._id);
    course.save();
    return savedChangeHoursPost;
  }catch(e){
    throw Error("Error while Creating change-hours-post")
  }
};

exports.deleteChangeHoursPost = async function(id){
  try {
    let deleted = await ChangeHoursPost.deleteOne({_id: id});
    if(deleted.n === 0){
      throw Error("post Could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error("Error Occured while Deleting the post")
  }
};



