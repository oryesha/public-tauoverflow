let UserProfile = require('../models/user-profile.model');
let Answer = require('../models/answer.model');
let Question = require('../models/question.model');
let Course = require('../models/course.model');

_this = this;

getCourseId = async function (ids) {
  let coursesId = [];
  ids.forEach(async (courseId) => {
      if(courseId === ""){}
      else {
        let course = await Course.findOne({courseNumber: courseId});
        coursesId.push(course._id);
      }
    }
  );
  return coursesId;
};

getQueryRegex = function (query) {
  const reg = query.replace(' ', '.*');
  return reg;
}



exports.getQuestionsFromQuery = async function(query) {
 if(!query.content){
   return [];
 }
  let questions = [];
  let coursesId = [];
  if(query.filters) {
    coursesId = await getCourseId(query.filters).then();
  }

  const queryRegex = getQueryRegex(query.content);
  let tmpQuestions = await Question.find({
    $or: [
      {subject: {$regex: queryRegex, $options: 'si'}},
      {content: {$regex: queryRegex, $options: 'si'}}
    ]
  }).catch(e => console.log(e));

  if (query.filters) {
    coursesId.forEach((id) => {
      tmpQuestions.forEach( (question) => {
        if (question.relatedCourses.indexOf(id) > -1) {
          questions.push(question)
        }
      });
    });
  } else {
    questions = tmpQuestions;
  }
  return questions;
};

//where('likes').in(['vaporizing', 'talking']).
