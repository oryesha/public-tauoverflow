let Answer = require('../models/answer.model');
let Question = require('../models/question.model');
let UserProfile = require('../models/user-profile.model');
let ServiceHelper = require('../services/serviceHelper');

_this = this;

exports.getAllAnswers = async function (query) {
  try {
    let answer = await Answer.paginate(query);
    return answer;
  } catch (e) {
    throw Error('Error while Paginating questions')
  }
};

exports.createAnswer = async function (answer) {
  let newAnswer = new Answer({
    content: answer.content,
    owner: answer.owner.id,
    timestamp: answer.timestamp,//TimeFormat,
    upvote: {count: answer.upvote.count, upvoters: ServiceHelper.getIdsFromList(answer.upvote.upvoters)},
    questionId: answer.questionId
  });

  try {
    let savedAnswer = await newAnswer.save();
    const user = await UserProfile.findById(newAnswer.owner);
    user.answered += 1;
    user.save();
    const question = await Question.findById(newAnswer.questionId);
    question.answers.push(savedAnswer._id);
    question.save();
    return savedAnswer;
  } catch (e) {
    throw Error("Error while Creating answer")
  }

};

exports.updateAnswer = async function (answer) {

  let id = answer.id;
  let oldAnswer;

  try {
    oldAnswer = await Answer.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the answer")
  }

  if (!oldAnswer) {
    return false;
  }

  oldAnswer.content = answer.content;
  oldAnswer.owner = answer.owner;
  oldAnswer.timestamp = answer.timestamp;//TimeFormat,
  oldAnswer.upvote = answer.upvote;
  oldAnswer.questionId = answer.questionId;

  try {
    let savedAnswer = await oldAnswer.save();
    return savedAnswer;
  } catch (e) {
    throw Error("And Error occured while updating the answer");
  }
};

exports.deleteAnswer = async function (id) {
  try {
    let deleted = await Answer.remove({_id: id});
    if (deleted.result.n === 0) {
      throw Error("answer Could not be deleted")
    }
    return deleted
  } catch (e) {
    throw Error("Error Occured while Deleting the answer")
  }
};


