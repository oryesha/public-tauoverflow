let CourseService = require('../services/course.service')

_this = this;

class CourseController {

  constructor() {
    this.courseService = new CourseService();
  }

  async getAllCourses(req, res) {
    try{
      let courses = await this.courseService.getAllCourses();
      return res.status(200).json({status: 200, data: courses, message: "Succesfully All Courses Recieved"});
    }catch(e){
      return res.status(400).json({status: 400, message: e.message});
    }
  }

  async getCourse(req, res) {
    const courseNum = req.params.courseId;

    try{
      const course = await this.courseService.getCourse(courseNum);
      return res.status(200).json({status: 200, data: course, message: "Succesfully course: "+courseNum+" Recieved"});
    }catch(e){
      return res.status(400).json({status: 400, message: e.message});
    }
  }
}

module.exports = CourseController;
