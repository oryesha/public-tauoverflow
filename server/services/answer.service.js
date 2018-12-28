let Answer = require('../models/answer.model');

_this = this;

exports.getAllAnswers = async function(query) {
  try {
    let answer = await Answer.paginate(query);
    return answer;
  } catch (e) {
    throw Error('Error while Paginating questions')
  }
};

exports.createAnswer = async function(answer){
  let newAnswer = new Answer({
    content: answer.content,
    owner: answer.owner,
    timeStamp: answer.timeStamp,//TimeFormat,
    upvote: answer.upvote,
    questionId: answer.questionId
  });

  try{
    let savedAnswer = await newAnswer.save();
    savedAnswer.populate('questionId','answers').exec(
      function(savedAnswer){
        savedAnswer.questionId.answers.push(savedAnswer);
        savedAnswer.questionId.save();
      });
    return savedAnswer;
  }catch(e){
    throw Error("Error while Creating answer")
  }
};

exports.updateAnswer = async function(answer){

  let id = answer.id;
  let oldAnswer;

  try{
    oldAnswer = await Answer.findById(id);
  }catch(e){
    throw Error("Error occured while Finding the answer")
  }

  if(!oldAnswer){
    return false;
  }

  oldAnswer.content = answer.content;
  oldAnswer.owner = answer.owner;
  oldAnswer.timeStamp = answer.timeStamp;//TimeFormat,
  oldAnswer.upvote = answer.upvote;
  oldAnswer.questionId = answer.questionId;

  try{
    let savedAnswer = await oldAnswer.save();
    return savedAnswer;
  }catch(e){
    throw Error("And Error occured while updating the answer");
  }
};

exports.deleteAnswer = async function(id){
  try{
    let deleted = await Answer.remove({_id: id});
    if(deleted.result.n === 0){
      throw Error("answer Could not be deleted")
    }
    return deleted
  }catch(e){
    throw Error("Error Occured while Deleting the answer")
  }
};


