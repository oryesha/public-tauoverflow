let CourseReview = require('../models/coures-review.model');
let Course = require('../models/course.model');
let UserProfile = require('../models/user-profile.model');
_this = this;

exports.getAllCourseReview = async function(query) {
  try {
    let courseReview = await CourseReview.paginate(query);
    return courseReview;
  } catch (e) {
    throw Error('Error while Paginating reviews')
  }
};

exports.createCourseReview = async function(courseReview){
  let newCourseReview = new CourseReview({
    subject: courseReview.subject,
    content: courseReview.content,
    owner: courseReview.owner.id,
    course: courseReview.course.id,
    timeStamp: courseReview.timeStamp,//TimeFormat,
    isLocked: courseReview.isLocked,
    rank: courseReview.rank
  });

  try{
    let savedReview = await newCourseReview.save();
    const user = await UserProfile.findById(newCourseReview.owner);
    user.myCourseReviews.push(savedReview._id);
    user.save();
    const course = await Course.findById(newCourseReview.course);
    course.reviews.push(savedReview._id);
    course.save();
    return savedReview;
  }catch(e){
    throw Error("Error while Creating course-review")
  }
};



