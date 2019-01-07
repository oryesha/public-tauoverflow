Question = require('../models/question.model');
Course = require('../models/course.model');

_this = this;

exports.getQuestionsFromQuery(query){

  Question.createIndex( { subject: "text", content: "text" } )
  let questions = []
  query.queryFilters.forEach((err,courseId) => {
    try {
      let course = await Course.findOne({'courseId' : courseId}) ;
    } 
    catch(e) {
      throw Error("Error occured while Finding the course");
    }
    if(!course){
      return false;
    }
    questions.push(course.relatedQuestions.find( { $text: { $search: query.queryString } },
   { score: { $meta: "textScore" } } ).sort( { score: { $meta: "textScore" } } )
   );
  }
  return questions
}
