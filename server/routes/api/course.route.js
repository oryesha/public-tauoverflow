let express = require('express');

let router = express.Router();

let CourseController = require('../../controller/course.controller');

const courseController = new CourseController();

router.get('/', courseController.printName);
router.get('/:courseId',courseController.getCourse);

module.exports = router;
