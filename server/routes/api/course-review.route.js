let express = require('express');

let router = express.Router();

let CourseReviewController = require('../../controller/couse-review.controller');
router.get('/',CourseReviewController.getAllCourseReview);
router.post('/',CourseReviewController.createCourseReview);
router.delete('/:id',CourseReviewController.deleteCourseReview);
module.exports = router;
