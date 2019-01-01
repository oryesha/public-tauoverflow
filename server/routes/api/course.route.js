let express = require('express');

let router = express.Router();

let CourseController = require('../../controller/course.controller');

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getAllCourses);
router.get('/:courseId',CourseController.getCourse);

module.exports = router;
