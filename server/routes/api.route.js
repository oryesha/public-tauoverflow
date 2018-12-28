let express = require('express');
let router = express.Router();
let questions = require('./api/question.route');
let courses = require('./api/course.route');
let answers = require('./api/answer.route');
let changeHours = require('./api/change-hours.route');
let user = require('./api/user.route');
let partnerPost = require('./api/partner-post.route');
let courseReview = require('./api/course-review.route');
router.use('/questions', questions);

router.use('/courses', courses);
router.use('/answers',answers);
router.use('/change-hours', changeHours);
router.use('/user', user);
router.use('/partner-post', partnerPost);
router.use('/course-review', courseReview);
module.exports = router;

// // declare axios for making http requests
// const axios = require('axios');
// const ApiRoute = 'https://jsonplaceholder.typicode.com';

// /* GET api listing. */
// router.get('/', (req, res) => {
//   res.send('api works');
// });
//
// // Get all posts
// router.get('/posts', (req, res) => {
//   // Get posts from the mock api
//   // This should ideally be replaced with a service that connects to MongoDB
//   axios.get(`${ApiRoute}/posts`)
//     .then(posts => {
//       res.status(200).json(posts.data);
//     })
//     .catch(error => {
//       res.status(500).send(error)
//     });
// });
