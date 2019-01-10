let Course = require('../models/course.model');



_this = this;

exports.getAllCourses = async function() {
  console.log('starting service get all courses');
  try {

    let coursesToSend = [];

    const courses = await Course.paginate();

    courses.docs.forEach((course) => {
      coursesToSend.push({id: course.id, courseName: course.name,
      courseNumber: course.courseNumber});
    });
    return coursesToSend;
  } catch (e) {
    throw Error('Error while Paginating all courses')
  }
};


exports.createCourse = async function(course){
    let newCourse = new Course({
      name: course.name,
      courseNumber: course.courseNumber,
      rank: 0,
    });

    try{
      let savedCourse = await newCourse.save();
      return savedCourse;
    }catch(e){
      throw Error("Error while Creating course")
    }
};

exports.getCourse = async function(courseNum) {
  try {
    const course = await Course.findOne({courseNumber: courseNum})
      .populate({
        path: 'reviews partnerPosts changeHours',
        populate: { path: 'owner course' }
      }).populate({
        path: 'questions',
        populate: { path: 'owner relatedCourses answers upvote.upvoters' }
      }).populate({
        path: 'answers',
        populate: { path: 'owner' }
      }).exec();
    return course;
  }
  catch (e) {
    throw Error('Error while fetching course: ' + courseNum)
  }
};


