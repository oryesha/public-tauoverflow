let CourseReviewService = require('../services/course-review.service')

exports.createCourseReview = async function(req,res){

  let courseReview = {
    subject: req.body.subject,
    content: req.body.content,
    owner: req.body.owner,
    course: req.body.course,
    timeStamp: req.body.timeStamp,//TimeFormat,
    isLocked: req.body.isLocked,
    rank: req.body.rank
  };

  try{
    let createdCourseReview = await CourseReviewService.createCourseReview(courseReview);
    return res.status(201).json({status: 201, data: createdCourseReview, message: "Succesfully Created course-review"})
  }catch(e){
    return res.status(400).json({status: 400, message: "course-review Creation was Unsuccesfull"})
  }
};
