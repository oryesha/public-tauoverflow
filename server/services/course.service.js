let Course = require('../models/course.model');

_this = this

exports.getAllCourses = async function() {
  console.log('starting service get all courses');
  try {
    const courses = await Course.paginate();
    console.log('peginate success get all courses');
    console.log('courses'+courses);
    return courses;
  } catch (e) {
    throw Error('Error while Paginating all courses')
  }
};

exports.getCourse = async function(courseNum) {
  try {
    const course = await Course.find({courseId: courseNum});
    return course;
  }
  catch (e) {
    throw Error('Error while fetching course: ' + courseNum)
  }
};


