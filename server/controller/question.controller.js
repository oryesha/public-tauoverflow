let QuestionService = require('../services/question.service');

exports.getAllQuestions = async function (req, res) {
  try {
    let questions = await QuestionService.getAllQuestions({});
    return res.status(200).json({status: 200, data: questions, message: "Succesfully Questions Recieved"});
  } catch (e) {
    return res.status(400).json({status: 400, message: "WOW " + e.message});
  }
};

exports.getQuestion = async function (req, res) {
  const id = req.params.id;

  try {
    const question = await QuestionService.getQuestion(id);
    return res.status(200).json({status: 200, data: question, message: "Succesfully question: " + id + " Recieved"});
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.createQuestion = async function (req, res) {

  let question = {
    subject: req.body.subject,
    content: req.body.content,
    owner: req.body.owner,
    timestamp: req.body.timestamp,//TimeFormat,
    isLocked: req.body.isLocked,
    relatedCourses: req.body.relatedCourses,
    upvote: req.body.upvote
  };
  try {
    let createdQuestion = await QuestionService.createQuestion(question);
    return res.status(201).json({status: 201, data: createdQuestion, message: "Succesfully Created Question"})
  } catch (e) {
    return res.status(400).json({status: 400, message: "Question Creation was Unsuccesfull"})
  }
};

exports.updateQuestion = async function (req, res) {

  if (!req.body.id) {
    return res.status(400).json({status: 400., message: "Id must be present"})
  }

  let id = req.body.id;

  let question = {
    id,
    subject: req.body.subject ? req.body.subject : null,
    content: req.body.content ? req.body.content : null,
    owner: req.body.owner ? req.body.owner : null,
    timestamp: req.body.timestamp ? req.body.timestamp : null,
    isLocked: req.body.isLocked ? req.body.isLocked : false,
    relatedCourses: req.body.relatedCourses ? req.body.relatedCourses : null,
    answers: req.body.answers ? req.body.answers : null,
    upvote: req.body.upvote ? req.body.upvote : null
  };

  try {
    let updatedQuestion = await QuestionService.updateQuestion(question);
    return res.status(200).json({status: 200, data: updatedQuestion, message: "Succesfully Updated Question"})
  } catch (e) {
    return res.status(400).json({status: 400., message: e.message})
  }
};

exports.removeQuestion = async function (req, res) {

  let id = req.params.id;
  try {
    let deleted = await QuestionService.deleteQuestion(id);
    return res.status(200).json({status: 200, message: "Succesfully Deleted Question"})
  } catch (e) {
    return res.status(400).json({status: 400, message: e.message})
  }
};

