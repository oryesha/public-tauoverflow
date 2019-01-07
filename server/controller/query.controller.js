// let AnswerService = require('../services/answer.service');


exports.getQueryResults = async function(req,res){
  try{
    //let answers = await AnswerService.getAllAnswers({});
    console.log(req.query);
    return res.status(200).json({status: 200, data: 'wow', message: "Succesfully query Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: "WOW " + e.message});
  }
};
