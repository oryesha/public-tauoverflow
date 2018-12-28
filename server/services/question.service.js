let Question = require('../models/question.model');
let Course = require('../models/course.model');
_this = this;

exports.getAllQuestions = async function(query) {
      try {
        let questions = await Question.paginate(query);
        return questions;
      } catch (e) {
        throw Error('Error while Paginating questions')
      }
};

exports.createQuestion = async function(question){
    let newQuestion = new Question({
      subject: question.subject,
      content: question.content,
      owner: question.owner,
      timeStamp: question.timeStamp,//TimeFormat,
      isLocked: question.isLocked,
      relatedCourses: question.relatedCourses,
      answers: question.answers,
      upvote: question.upvote
    });

    try{
      let savedQuestion = await newQuestion.save();
      savedQuestion.populate('relatedCourses').exec(
        function(savedQuestion){
          savedQuestion.relatedCourses.forEach(function(course){
            course.questionsList.push(savedQuestion);
          })
      });
      return savedQuestion;
    }catch(e){
      throw Error("Error while Creating question")
    }
};

exports.updateQuestion = async function(question){

    let id = question.id;
    let oldQuestion;

    try{
      oldQuestion = await Question.findById(id);
    }catch(e){
      throw Error("Error occured while Finding the question")
    }

    if(!oldQuestion){
      return false;
    }

    oldQuestion.subject =  question.subject;
    oldQuestion.content = question.content;
    oldQuestion.owner = question.owner;
    oldQuestion.timeStamp = question.timeStamp;//TimeFormat,
    oldQuestion.isLocked = question.isLocked;
    oldQuestion.relatedCourses =  question.relatedCourses;
    oldQuestion.answers = question.answers;
    oldQuestion.upvote = question.upvote;

    console.log(oldQuestion);

    try{
      let savedQuestion = await oldQuestion.save();
      return savedQuestion;
    }catch(e){
      throw Error("And Error occured while updating the question");
    }
};

exports.deleteQuestion = async function(id){
    try{
      let deleted = await Question.remove({_id: id});
      if(deleted.result.n === 0){
        throw Error("question Could not be deleted")
      }
      return deleted
    }catch(e){
      throw Error("Error Occured while Deleting the question")
    }
};


