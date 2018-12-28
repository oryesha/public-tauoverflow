let express = require('express');

let router = express.Router();

let CourseReviewController = require('../../controller/couse-review.controller');

router.post('/',CourseReviewController.createCourseReview);
module.exports = router;
