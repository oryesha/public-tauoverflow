let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Question = require('./question.model');
let CourseReview = require('./course-review.model');
let PartnerPost = require('./partner-post.model');
let ChangeHoursPost = require('./chang-hourse-post.model');


DB-ID: string (private)
RelatedCourses: Course[]
Upvote:
  count: number
Upvoters: Set (DB-IDs)
Answers: Answer[]
CourseName: string
Rank: number
