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

exports.getUser = async function(userId) {
  try {
    const user = await User.find({id: userId});
    return user;
  }
  catch (e) {
    throw Error('Error while fetching user: ' + userId)
  }
};

exports.createNewUser = async function(user){
  console.log(user);
  let newUser = new User({
    _id: user.id,
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
