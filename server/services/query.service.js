let UserProfile = require('../models/user-profile.model');
let Answer = require('../models/answer.model');
let Question = require('../models/question.model');
let Course = require('../models/course.model');
let serviceHelper = require('../services/serviceHelper');

_this = this;

const redundantWords = ['so', 'what', 'who', 'why', 'where', 'was', 'were', 'how ', 'which',
  'to', 'it', 'the', 'from', 'in', 'on', 'is', 'she', 'he', 'her', 'his', 'them', 'they', 'this', 'that',
'are', 'those', 'you', 'me', ' a ', 'at', 'when'];

const redundantSuffix = ['ied' ,'ed', 's', '\'s' , 'ing', 'ies', 'es'];

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

// getReducedQueryRegex = function (query) {
//   let req = query.toLowerCase();
//   let keywords = [];
//   req.replace('-', ' ').split(/\s+/).forEach((word) => {
//     req = req.replace(word, '.*');
//   });
//   redundantSuffix.forEach((suffix) => {
//     req = req.replace(suffix+' ', '.*');
//     if (req.endsWith(suffix)) {
//       req = reduceRedundantEndingsIfNeeded(req, suffix);
//     }
//   });
//   return getQueryRegex(req);
// }

getQueryRegex = function (query) {
  const reg = '.*' + query.replace(' ', '.*') + '.*';
  return reg;
};

reduceRedundantEndingsIfNeeded = function (word) {
  for (let i = 0; i < redundantSuffix.length; i++) {
    if (word.endsWith(redundantSuffix[i])) {
      return word.substring(0, word.length - redundantSuffix[i].length);
    }
  }
  return word;
};

breakQueryToKeywords = function (query) {
  let keywords = [];
  query.toLowerCase().replace('-', ' ').split(/\s+/)
    .forEach( (rawKeyword) => {
      if (redundantWords.indexOf(rawKeyword) === -1) {
        keywords.push(reduceRedundantEndingsIfNeeded(rawKeyword));
      }
  });
  return keywords;
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

  let queryRegex = getQueryRegex(query.content);
  let tmpQuestions = await tryGetSearchResults(queryRegex);

  if (tmpQuestions.length === 0) {
    const keywords = breakQueryToKeywords(query.content);
    queryRegex = ('.*' + keywords.join('.*') + '.*');
    tmpQuestions = await tryGetSearchResults(queryRegex);

    if (tmpQuestions.length === 0) {
      queryRegex = keywords.join('.*|.*');
      tmpQuestions = await tryGetSearchResults('.*' + queryRegex + '.*');
    }
  }

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

tryGetSearchResults = async function(queryRegex) {
  return await Question.find({
    $or: [
      {subject: {$regex: queryRegex, $options: 'si'}},
      {content: {$regex: queryRegex, $options: 'si'}}
    ]
  }).populate([{ path: 'relatedCourses owner answers' ,
    populate: { path: 'skills owner' , populate: {path: 'skills'}}}]);
};
