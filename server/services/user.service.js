let User = require('../models/user-profile.model');
let ServiceHelper = require('../services/serviceHelper');

_this = this;

exports.getAllUsers = async function() {
  try {
    let users = await User.paginate();
    return users;
  } catch (e) {
    throw Error('Error while Paginating questions')
  }
};

exports.getUser = async function(userToken) {
  try {
    const user = await User.findOne({firebaseToken: userToken})
      .populate({
        path: 'myPartnerPosts myCourseReviews myChangeHoursPosts',
        populate: { path: 'owner course' }
      }).populate({
        path: 'skills myCourses',
        populate: {path: 'questions reviews partnerPosts changeHours'}
      }).populate({
        path: 'favorites myQuestions',
        populate: {path: 'owner relatedCourses answers upvote.upvoters',
        populate: { path: 'owner upvote.upvoters' }}
      }).exec();
    return user;
  }
  catch (e) {
    throw Error('Error while fetching user: ' + userToken)
  }
};

exports.createNewUser = async function(user){
  let newUser = new User({
    firebaseToken: user.firebaseToken,
    firstName: user.firstName,
    lastName: user.lastName,
    program: user.program,
    email: user.email,
    rank: 0,
    image: user.image,
    asked: 0,
    answered: 0,
    description: user.description,
    skills: user.skills,
  });

  try{
    let savedUser = await newUser.save();
    return savedUser;
  }catch(e){
    throw Error("Error while Creating New User")
  }
};

exports.updateFavorites = async function(userId, questionId) {
  let user;
  try {
    user = await User.findById(userId);
  } catch (e) {
    throw Error('Couldn\'t find user');
  }
  const index = user.favorites.indexOf(questionId);
  if (index === -1) {
    user.favorites.push(questionId);
  } else {
    user.favorites.splice(index, 1);
  }

  try {
    return await user.save();
  } catch (e) {
    throw Error('Couldn\'t save updated user');
  }
};

exports.updateMyCourses = async function(userId, courseId) {
  let user;
  try {
    user = await User.findById(userId);
  } catch (e) {
    throw Error('Couldn\'t find user');
  }
  const index = user.myCourses.indexOf(courseId);
  if (index === -1) {
    user.myCourses.push(courseId);
  } else {
    user.myCourses.splice(index, 1);
  }

  try {
    return await user.save();
  } catch (e) {
    throw Error('Couldn\'t save updated user');
  }
};

exports.updateUser = async function(user){

  let token = user.firebaseToken;
  let oldUser;

  try{
    oldUser = await User.findOne({firebaseToken: token});
  }catch(e){
    throw Error("Error occured while Finding the user")
  }

  if(!oldUser){
    return false;
  }

  oldUser.firebaseToken = user.firebaseToken;
  oldUser.firstName = user.firstName;
  oldUser.lastName = user.lastName;
  oldUser.program = user.program;
  oldUser.rank = user.rank;
  oldUser.email = user.email;
  oldUser.asked = user.asked;
  oldUser.answered = user.answered;
  oldUser.image = user.image;
  oldUser.description = user.description;
  ServiceHelper.updateList(oldUser.skills, user.skills);
  ServiceHelper.updateList(oldUser.favorites, user.favorites);
  ServiceHelper.updateList(oldUser.myQuestions, user.myQuestions);
  ServiceHelper.updateList(oldUser.myPartnerPosts, user.myPartnerPosts);
  ServiceHelper.updateList(oldUser.myChangeHoursPosts, user.myChangeHoursPosts);
  ServiceHelper.updateList(oldUser.myCourseReviews, user.myCourseReviews);

  try{
    let savedUser = await oldUser.save();
    return savedUser;
  }catch(e){
    throw Error("Error occured while updating the user");
  }
};


