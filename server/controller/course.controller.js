let CourseService = require('../services/course.service')

exports.getAllCourses = async function(req, res) {
  try{
    console.log('before controller get all courses ');
    console.log(CourseService);
    let courses = await CourseService.getAllCourses();
    console.log('after controller get all courses');
    return res.status(200).json({status: 200, data: courses, message: "Succesfully All Courses Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.createCourse = async function(req, res) {
  console.log(req);
}

exports.getCourse = async function(req, res) {
  const courseNum = req.params.courseId;

  try{
    const course = await this.courseService.getCourse(courseNum);
    return res.status(200).json({status: 200, data: course, message: "Succesfully course: "+courseNum+" Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};
