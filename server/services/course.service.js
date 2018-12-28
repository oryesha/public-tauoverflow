let Course = require('../models/course.model');

_this = this;

class CourseService {

  constructor(){}

  async getAllCourses() {
    try {
      const courses = await Course.paginate();
      return courses;
    } catch (e) {
      throw Error('Error while Paginating all courses')
    }
  }

  async getCourse(courseNum) {
    try {
      const course = await Course.find({courseId: courseNum});
      return course;
    }
    catch (e) {
      throw Error('Error while fetching course: ' + courseNum)
    }
  }
}

module.exports = CourseService;
