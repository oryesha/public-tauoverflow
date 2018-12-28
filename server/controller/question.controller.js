let QuestionService = require('../services/question.service')

class QuestionController{

  constructor(){
    this.questionService = new QuestionService();
  }

  async getAllQuestions(req,res){
    try{
      let questions = await this.questionService.getAllQuestions({});
      return res.status(200).json({status: 200, data: questions, message: "Succesfully Questions Recieved"});
    }catch(e){
      return res.status(400).json({status: 400, message: e.message});
    }
  }
  async createQuestion(req,res){

    let question = {
      subject: req.body.subject,
      content: req.body.content,
      owner: req.body.owner,
      timeStamp: req.body.timeStamp,//TimeFormat,
      isLocked: req.body.isLocked,
      relatedCourses: req.body.relatedCourses,
      answers: req.body.answers,
      upvote: req.body.upvote
    };

    try{
      let createdQuestion = await this.questionService.createQuestion(question);
      return res.status(201).json({status: 201, data: createdQuestion, message: "Succesfully Created Question"})
    }catch(e){
      return res.status(400).json({status: 400, message: "Question Creation was Unsuccesfull"})
    }
  }

  async updateQuestion(req,res){

    if(!req.body._id){
      return res.status(400).json({status: 400., message: "Id must be present"})
    }

    let id = req.body._id;

    let question = {
      id,
      subject: req.body.subject ? req.body.subject : null,
      content: req.body.content ? req.body.content : null,
      owner: req.body.owner ? req.body.owner : null,
      timeStamp: req.body.timeStamp ? req.body.timeStamp : null,
      isLocked: req.body.isLocked ? req.body.isLocked : null,
      relatedCourses: req.body.relatedCourses ? req.body.relatedCourses : null,
      answers: req.body.answers ? req.body.answers : null,
      upvote: req.body.upvote ? req.body.upvote : null
    };

    try{
      let updatedQuestion = await this.questionService.updateQuestion(question);
      return res.status(200).json({status: 200, data: updatedQuestion, message: "Succesfully Updated Question"})
    }catch(e){
      return res.status(400).json({status: 400., message: e.message})
    }
  }

  async removeQuestion(req, res){

    let id = req.params.id;
    try{
      let deleted = await this.questionService.deleteQuestion(id);
      return res.status(204).json({status:204, message: "Succesfully Deleted Question"})
    }catch(e){
      return res.status(400).json({status: 400, message: e.message})
    }
  }
}

module.exports = QuestionController;
