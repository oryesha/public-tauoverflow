let AnswerService = require('../services/answer.service')


exports.getAllAnswers = async function(req,res){
  try{
    let answerss = await AnswerService.getAllAnswers({});
    return res.status(200).json({status: 200, data: answerss, message: "Succesfully Questions Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: "WOW " + e.message});
  }
};

exports.createAnswer = async function(req,res){

  let answer = {
    content: req.body.content,
    owner: req.body.owner,
    timeStamp: req.body.timeStamp,//TimeFormat,
    upvote: req.body.upvote,
    questionId: req.body.questionId
  };

  try{
    let createdAnswer = await AnswerService.createAnswer(answer);
    return res.status(201).json({status: 201, data: createdAnswer, message: "Succesfully Created Question"})
  }catch(e){
    return res.status(400).json({status: 400, message: "Question Creation was Unsuccesfull"})
  }
};


exports.updateAnswer = async function(req,res){

  if(!req.body._id){
    return res.status(400).json({status: 400., message: "Id must be present"})
  }

  let id = req.body._id;

  let answer = {
    id,
    content: req.body.content ? req.body.content : null,
    owner: req.body.owner ? req.body.owner : null,
    timeStamp: req.body.timeStamp ? req.body.timeStamp : null,
    upvote: req.body.upvote ? req.body.upvote : null,
    questionId: req.body.questionId ? req.body.questionId : null
  };

  try{
    let updatedAnswer = await AnswerService.updateAnswer(answer);
    return res.status(200).json({status: 200, data: updatedAnswer, message: "Succesfully Updated answer"})
  }catch(e){
    return res.status(400).json({status: 400., message: e.message})
  }
};
