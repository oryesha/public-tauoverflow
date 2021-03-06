let Question = require('../models/question.model');
let UserProfile = require('../models/user-profile.model');
let Course = require('../models/course.model');
let ServiceHelper = require('../services/serviceHelper');

_this = this;

exports.getAllQuestions = async function(query) {
      try {
        let questions = await Question.paginate(query);
        return questions;
      } catch (e) {
        throw Error('Error while Paginating questions')
      }
};

exports.getQuestion = async function(id) {
  try {
    const question = await Question.findById(id)
      .populate({
        path: 'owner relatedCourses answers interestedIn',
        populate: {path: 'owner skills upvote.upvoters',
          populate: {path: 'skills'}}}).exec();
    return question;
  }
  catch (e) {
    throw Error('Error while fetching question: ' + id)
  }
};


exports.createQuestion = async function(question){

  // subject: String,
  //   content: String,
  //   owner: {type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'},
  // timestamp: Date,//TimeFormat,
  //   isLocked: Boolean,
  //   relatedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
  //   answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}],
  //   upvote: {
  //   count: Number,
  //     upvoters: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile'}]
  // }

    let newQuestion = new Question({
      subject: question.subject,
      content: question.content,
      owner: question.owner.id,
      timestamp: question.timestamp,//TimeFormat,
      isLocked: false,
      relatedCourses: ServiceHelper.getIdsFromList(question.relatedCourses),
      answers: [],
      upvote: {count: question.upvote.count, upvoters: ServiceHelper.getIdsFromList(question.upvote.upvoters)}
    });


  try{
    let savedQuestion = await newQuestion.save();

    const asker = await UserProfile.findById(newQuestion.owner);
    // asker.asked += 1;
    asker.myQuestions.push(savedQuestion._id);
    asker.save();

    savedQuestion.relatedCourses.forEach(async (courseId) => {
      const course = await Course.findById(courseId);
      course.questions.push(savedQuestion._id);
      course.save();
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

    oldQuestion.upvote = question.upvote;
    oldQuestion.isLocked = question.isLocked;
    oldQuestion.content = question.content;
    oldQuestion.subject = question.subject;

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

exports.getInterestedUsers = async function(questionId) {
  try {

    const res = [];

    const question = await Question.findById(questionId).populate('interestedIn').exec();

      if(question.interestedIn) {
        question.interestedIn.forEach((user) => {
          if (res.indexOf(user.firebaseToken) === -1) {
            res.push(user.firebaseToken);
          }
        });
      }

    return res;
  }
  catch (e) {
    throw Error('Error while fetching skilled users from question: ' + questionId);
  }
};


