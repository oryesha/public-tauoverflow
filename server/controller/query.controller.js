let QueryService = require('../services/query.service');
let QuestionService = require('../services/question.service');

exports.getQueryResults = async function(req,res){
  try {
    let questions = await QueryService.getQuestionsFromQuery(req.query);
    return res.status(200).json({status: 200, data: questions, message: "Succesfully query Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: "WOW " + e.message});
  }
};
