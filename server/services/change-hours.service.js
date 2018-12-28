let Post = require('../models/chang-hourse-post.model');

_this = this;

exports.createChangeHoursPost = async function(post){
  let newPost = new Post({
    subject: post.subject,
    content: post.content,
    owner: post.owner,
    timeStamp: post.date,//TimeFormat,
    isLocked: post.isLocked
  });

  try{
    let savedPost = await newPost.save();
    savedPost.relatedCourses.forEach(function(course){
      course.findOneAndUpdate(
        {courseId : course.courseId},
        {}
      )
    });

    return savedQuestion;
  }catch(e){
    throw Error("Error while Creating question")
  }
};
