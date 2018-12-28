let QuestionService = require('../services/question.service');

_this = this;


exports.getQuestions = async function(req, res, next){

  let page = req.query.page ? req.query.page : 1;
  let limit = req.query.limit ? req.query.limit : 10;

  console.log(page, limit);

  try{
    let questions = await QuestionService.getQuestions({}, page, limit);
    return res.status(200).json({status: 200, data: questions, message: "Succesfully Questions Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.createQuestion = async function(req, res, next){
  let question = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
    courses: req.body.courses,
    owner: req.body.owner
  };

  try{
    let createdQuestion = await QuestionService.createQuestion(question);
    return res.status(201).json({status: 201, data: createdQuestion, message: "Succesfully Created Question"})
  }catch(e){
    return res.status(400).json({status: 400, message: "Question Creation was Unsuccesfull"})
  }
};

exports.updateQuestion = async function(req, res, next){

  if(!req.body._id){
    return res.status(400).json({status: 400., message: "Id must be present"})
  }

  let id = req.body._id;

  console.log(req.body);

  let question = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null,
    courses: req.body.courses ? req.body.courses : null,
    owner: req.body.owner ? req.body.owner : null

  };

  try{
    let updatedQuestion = await QuestionService.updateQuestion(question);
    return res.status(200).json({status: 200, data: updatedQuestion, message: "Succesfully Updated Question"})
  }catch(e){
    return res.status(400).json({status: 400., message: e.message})
  }
};

exports.removeQuestion = async function(req, res, next){

  let id = req.params.id;

  try{
    let deleted = await QuestionService.deleteQuestion(id);
    return res.status(204).json({status:204, message: "Succesfully Deleted Question"})
  }catch(e){
    return res.status(400).json({status: 400, message: e.message})
  }

};
