let express = require('express');
let router = express.Router();
let questions = require('./api/question.route');

router.use('/questions', questions);



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
