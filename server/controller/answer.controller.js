let AnswerService = require('../services/answer.service')


exports.getAllAnswers = async function(req,res){
  try{
    let answers = await AnswerService.getAllAnswers({});
    return res.status(200).json({status: 200, data: answers, message: "Succesfully answers Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: "WOW " + e.message});
  }
};

exports.createAnswer = async function(req,res){

  let answer = {
    content: req.body.content,
    owner: req.body.owner,
    timestamp: req.body.timestamp,//TimeFormat,
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

  if(!req.body.id){
    return res.status(400).json({status: 400., message: "Id must be present"})
  }

  let id = req.body.id;

  let answer = {
    id,
    content: req.body.content ? req.body.content : null,
    owner: req.body.owner ? req.body.owner : null,
    timestamp: req.body.timestamp ? req.body.timestamp : null,
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

exports.deleteAnswer = async function(req,res) {
  let id = req.params.id;
  try {
    let deleted = await AnswerService.deleteAnswer(id);
    return res.status(200).json({status: 200, message: "Succesfully Deleted answer"})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};
