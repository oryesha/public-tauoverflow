let Course = require('../models/course.model');



_this = this

exports.getAllCourses = async function() {
  console.log('starting service get all courses');
  try {

    let coursesToSend = [{
      courseName: String,
      courseNumber: String
    }];

    const courses = await Course.paginate();

    courses.docs.forEach(function(course) {
      coursesToSend.push({courseName: course.name,
      courseNumber:course.courseNumber});
    });
    return coursesToSend;
  } catch (e) {
    throw Error('Error while Paginating all courses')
  }
};


exports.createCourse = async function(course){
    let newCourse = new Course({
      name: course.name,
      courseNumber: course.courseNumber
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
    const course = await Course.findOne({courseNumber: courseNum});
    return course;
  }
  catch (e) {
    throw Error('Error while fetching course: ' + courseNum)
  }
};


