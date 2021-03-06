let Course = require('../models/course.model');



_this = this;

exports.getAllCourses = async function() {
  console.log('starting service get all courses');
  try {

    let coursesToSend = [];

    const courses = await Course.find({}).sort({name: 1});

    courses.forEach((course) => {
      coursesToSend.push({id: course._id, courseName: course.name,
      courseNumber: course.courseNumber});
    });
    return coursesToSend;
  } catch (e) {
    throw Error('Error while Paginating all courses')
  }
};


exports.createCourse = async function(course){

    let isCourseExists = await Course.findOne({courseNumber: course.courseNumber})
    if (isCourseExists) {
      return null;
    }
    let newCourse = new Course({
      name: course.name,
      courseNumber: course.courseNumber,
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
        options: { sort: {'timestamp': -1}},
        populate: { path: 'owner course' }
      }).populate({
        path: 'questions', options: { sort: {'timestamp': -1}},
        populate: { path: 'owner relatedCourses interestedIn answers upvote.upvoters', populate: { path: 'owner upvote.upvoters skills',
          populate: {path: 'skills'}} }
      }).exec();
    return course;
  }
  catch (e) {
    throw Error('Error while fetching course: ' + courseNum);
  }
};

exports.getSkilledUsers = async function(courseIds) {
  try {
    let courses = courseIds;
    if(!Array.isArray(courseIds)) {
      courses = courseIds.split(',');
    }

    const skilledUsers = [];

    await Promise.all(courses.map( async (courseId) => {
      const course = await Course.findOne({_id: courseId})
        .populate('interestedIn').exec();

      if(course.interestedIn) {
        course.interestedIn.forEach((user) => {
          if (skilledUsers.indexOf(user.firebaseToken) === -1) {
            skilledUsers.push(user.firebaseToken);
          }
        });
      }

    }));

    return skilledUsers;
  }
  catch (e) {
    throw Error('Error while fetching skilled users from course: ' + courseId);
  }
};


