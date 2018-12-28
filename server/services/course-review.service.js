let CourseReview = require('../models/coures-review.model');
_this = this;


exports.createCourseReview = async function(courseReview){
  let newCourseReview = new CourseReview({
    subject: courseReview.subject,
    content: courseReview.content,
    owner: courseReview.owner,
    course: courseReview.course,
    timeStamp: courseReview.timeStamp,//TimeFormat,
    isLocked: courseReview.isLocked,
    rank: courseReview.rank
  });

  try{
    let savedCourseReview = await newCourseReview.save();
    savedCourseReview.populate('course').populate('owner').exec(
      function(savedCourseReview){
        savedCourseReview.course.reviews.push(savedCourseReview);
        savedCourseReview.course.save();
        savedCourseReview.owner.myCourseReview.push(savedCourseReview);
        savedCourseReview.owner.save();
      });
    return savedCourseReview;
  }catch(e){
    throw Error("Error while Creating course-review")
  }
};



