let Post = require('../models/change-hours-post.model');

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
    timeStamp: post.date,//TimeFormat,
    isLocked: post.isLocked
  });

  try{
    let savedPost = await newPost.save();
    savedPost.populate('course').populate('owner').exec(function(err, post) {
        post.course.changeHours.push(post);
        post.course.save();
        post.owner.myChangHoursPosts.push(post);
        post.owner.save();
      });
    return savedPost;
  }catch(e){
    throw Error("Error while Creating Change Hour Post")
  }
};
