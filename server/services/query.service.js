let UserProfile = require('../models/user-profile.model');
let Answer = require('../models/answer.model');
let Question = require('../models/question.model');
let Course = require('../models/course.model');
let serviceHelper = require('../services/serviceHelper');

_this = this;

getCourseId = async function (ids) {
  let coursesIds = [];
  ids.forEach(async (courseId) => {
      if (courseId != '') {
        let course = await Course.findOne({courseNumber: courseId});
        coursesIds.push(course._id);
      }
    }
  );
  return coursesIds;
};

getQueryRegex = function (query) {
  const reg = query.replace(' ', '.*');
  return reg;
};


getCourseNumbersFromList = function(list) {
  const res = [];
  if (list === undefined || list.length == 0) {
    return res;
  }
  list.forEach(function (listItem) {
    const num = listItem.courseNumber;
    res.push(num);
  });
  return res;
};


exports.getQuestionsFromQuery = async function(query) {
 if(!query.content){
   return [];
 }
  let questions = [];
  let courses = [];
  if(query.filters && !Array.isArray(query.filters)) {
    courses = query.filters.split(',');
    //coursesId = await getCourseId(query.filters)
  }
  else {
    courses = query.filters;
  }

  const queryRegex = getQueryRegex(query.content);
  let tmpQuestions = await Question.find({
    $or: [
      {subject: {$regex: queryRegex, $options: 'si'}},
      {content: {$regex: queryRegex, $options: 'si'}}
    ]
  }).populate([{ path: 'relatedCourses owner answers' , populate: { path: 'owner' }}]);

  if (query.filters) {
    tmpQuestions.forEach( (question) => {
      let inFilter = courses.some(r => getCourseNumbersFromList(question.relatedCourses).includes(r));
      if (inFilter) {
        questions.push(question);
      }
    });
  } else {
    questions = tmpQuestions;
  }
  return questions;
};

//where('likes').in(['vaporizing', 'talking']).
