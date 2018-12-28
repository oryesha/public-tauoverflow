let Post = require('../models/chang-hourse-post.model');

_this = this;

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
    savedPost.populate('course').exec(function(err, post) {
        post.course.changeHours.push(post);
        post.course.save();
      });
    return savedPost;
  }catch(e){
    throw Error("Error while Creating Change Hour Post")
  }
};
