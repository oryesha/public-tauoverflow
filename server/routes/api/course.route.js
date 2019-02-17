let express = require('express');

let router = express.Router();

let CourseController = require('../../controller/course.controller');

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getAllCourses);
router.get('/skilled-users/', CourseController.getSkilledUsers);
router.get('/:courseNumber',CourseController.getCourse);

module.exports = router;
