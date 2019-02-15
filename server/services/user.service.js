let Course = require("../models/course.model");
let ProfileRank = require('../services/profileRank');
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
    const user =  await User.findOne({firebaseToken: userToken})
      .populate({
        path: 'myPartnerPosts myCourseReviews myChangeHoursPosts',
        populate: { path: 'owner course' }
      }).populate({
        path: 'skills myCourses',
        populate: {path: 'questions reviews partnerPosts changeHours'}
      }).populate({
        path: 'favorites myQuestions myAnswers',
        populate: {path: 'owner relatedCourses answers upvote.upvoters',
        populate: { path: 'owner upvote.upvoters' }}
      }).exec();
    const rank = Math.round(ProfileRank.calcUserRank(user));
    user.rank = rank;
    await user.save();
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
    // asked: 0,
    // answered: 0,
    description: user.description,
    skills: user.skills,
    notifyOnMyQuestions: user.notificationSettings.notifyOnMyQuestions,
    notifyOnMyFavorites: user.notificationSettings.notifyOnMyFavorites,
    notifyOnMyCourses: user.notificationSettings.notifyOnMyCourses,
    notifyOnMySkills: user.notificationSettings.notifyOnMySkills,
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

exports.updateNotificationSettings = async function(userId, newSettings) {
  try {
    const user = await User.findById(userId);
    user.notifyOnMyQuestions = newSettings.notifyOnMyQuestions;
    user.notifyOnMyFavorites = newSettings.notifyOnMyFavorites;
    user.notifyOnMyCourses = newSettings.notifyOnMyCourses;
    user.notifyOnMySkills = newSettings.notifyOnMySkills;
    return await user.save();
  } catch (e) {
    throw Error("Couldn't update notification settings");
  }
};

exports.updateMyCourses = async function(userId, courseId) {
  let user;
  let course;
  try {
    user = await User.findById(userId);
    course = await Course.findOne({_id: courseId});
    if(!course.interestedIn) {
      course.interestedIn = [];
    }
  } catch (e) {
    throw Error('Couldn\'t find user');
  }
  //see if course should be added or removed from my courses
  const index = user.myCourses.indexOf(courseId);
  //add course to my courses
  if (index === -1) {
    user.myCourses.push(courseId);
    //add user as interested in this course
    course.interestedIn.push(user._id);
  //remove course from my courses
  } else {
    user.myCourses.splice(index, 1);
    //remove user as interested in this course
    const userIdx = course.interestedIn.indexOf(user._id);
    if (index !== -1) {
      course.interestedIn.splice(userIdx, 1);
    }
  }

  course.save();

  try {
    return await user.save();
  } catch (e) {
    throw Error('Couldn\'t save updated user');
  }
};

exports.addToMyCourses = async function(userId, courseIds) {
  let user;
  try {
    user = await User.findById(userId);
    courseIds.forEach(async (id) => {
      user.myCourses.push(id);
      //updated course that someone is skilled on it
      let course = await Course.findOne({_id: id});
      if(!course.interestedIn) {
        course.interestedIn = [];
      }
      course.interestedIn.push(user._id);
      course.save();
    });
  } catch (e) {
    throw Error('Couldn\'t find user');
  }

  try {
    return await user.save();
  } catch (e) {
    throw Error('Couldn\'t save updated user');
  }
};

exports.removeFromMyCourses = async function(userId, courseId) {
  let user;
  try {
    user = await User.findById(userId);
  } catch (e) {
    throw Error('Couldn\'t find user');
  }
  const index = user.myCourses.indexOf(courseId);
  if (index !== -1) {
    user.myCourses.splice(index, 1);
  }
  // delete user from the course he is marked as interested - we don't want him to get notifications
  try {
    let course = await Course.findById(courseId);
    if(course.interestedIn) {
      const index = course.interestedIn.indexOf(user._id);
      if (index !== -1) {
        course.interestedIn.splice(index, 1);
        await course.save();
      }
    }
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

  // delete user from interested in courses he is no longer skilled at
  _deleteUserFromRemovedSkilledCourses(oldUser.skills, user.skills, oldUser._id);

  //updated course that someone is skilled on it
  _AddUserToNewSkilledCoursesNotificationList(oldUser.skills, user.skills, oldUser._id);


  oldUser.firebaseToken = user.firebaseToken;
  oldUser.firstName = user.firstName;
  oldUser.lastName = user.lastName;
  oldUser.program = user.program;
  oldUser.rank = user.rank;
  oldUser.email = user.email;
  // oldUser.asked = user.asked;
  // oldUser.answered = user.answered;
  oldUser.image = user.image;
  oldUser.description = user.description;
  ServiceHelper.updateList(oldUser.skills, user.skills);
  ServiceHelper.updateList(oldUser.favorites, user.favorites);
  ServiceHelper.updateList(oldUser.myQuestions, user.myQuestions);
  ServiceHelper.updateList(oldUser.myAnswers, user.myAnswers);
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

_deleteUserFromRemovedSkilledCourses = function(oldSkills, updatedSkills, userId){

  try {
    if (!oldSkills)
      return;

    oldSkills.forEach(async (skill) => {
      if (!updatedSkills.includes(skill.toString())) {
        // user should be deleted from interested list of this course - no longer skilled at
        let course = await Course.findById(skill);
        if(course.interestedIn) {
          const index = course.interestedIn.indexOf(userId);
          if (index !== -1) {
            course.interestedIn.splice(index, 1);
            await course.save();
          }
        }
      }
    });
  } catch(e){
  throw Error("Error occured while deleting user from courses he is no longer skilled at")
  }

};

_AddUserToNewSkilledCoursesNotificationList = function(oldSkills, updatedSkills, userId) {

  try {
    updatedSkills.forEach(async (skillId) => {
      if (oldSkills.indexOf(skillId) === -1) {
        let course = await Course.findOne({_id: skillId});
        if(!course.interestedIn) {
          course.interestedIn = [];
        }
        course.interestedIn.push(userId);
        course.save();
      }
    });
  } catch(e){
    throw Error("Error occured while adding user to new courses he is skilled at")
  }

};


