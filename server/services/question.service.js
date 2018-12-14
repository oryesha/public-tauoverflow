let Question = require('../models/question.model');

_this = this;


exports.getQuestions = async function(query, page, limit){
  let options = {
    page,
    limit
  };
  try {
    let questions = await Question.paginate(query, options);
    return questions;
  } catch (e) {
    throw Error('Error while Paginating questions')
  }
};

exports.createQuestion = async function(question){

  let newQuestion = new Question({
    title: question.title,
    description: question.description,
    date: new Date(),
    status: question.status,
    courses: question.courses,
    owner: question.owner
  });

  try{
    let savedQuestion = await newQuestion.save();
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

  console.log(oldQuestion);

  oldQuestion.title = question.title;
  oldQuestion.description = question.description;
  oldQuestion.status = question.status;
  oldQuestion.courses = question.courses;
  oldQuestion.owner = question.owner;
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
