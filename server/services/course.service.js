let Course = require('../models/course.model');



_this = this

exports.getAllCourses = async function() {
  console.log('starting service get all courses');
  try {
    let coursesToSend = [{
      courseName: String,
      courseId: String
    }];

    const courses = await Course.paginate();

    courses.docs.forEach(function(course) {
      coursesToSend.push({courseName: course.name,
      courseId:course.courseId});
    });
    return coursesToSend;
  } catch (e) {
    throw Error('Error while Paginating all courses')
  }
};


exports.createCourse = async function(course){
  console.log(course);
    let newCourse = new Course({
      name: course.name,
      courseId: course.courseId,
      questions: [],
      reviews: [],
      partnerPosts: [],
      changeHours: [],
      rank: 0
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
    const course = await Course.find({courseId: courseNum});
    return course;
  }
  catch (e) {
    throw Error('Error while fetching course: ' + courseNum)
  }
};


