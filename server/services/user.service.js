let User = require('../models/user-profile.model');

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
    const user = await User.findOne({firebaseToken: userToken});
    return user;
  }
  catch (e) {
    throw Error('Error while fetching user: ' + userToken)
  }
};

exports.createNewUser = async function(user){
  console.log(user);
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
  (user.skills).forEach(function (skillId) {
    if (oldUser.skills.indexOf(skillId) === -1) {
      oldUser.skills.push(skillId);
    }
  });

  console.log(oldUser);

  try{
    let savedUser = await oldUser.save();
    return savedUser;
  }catch(e){
    throw Error("Error occured while updating the user");
  }
};
