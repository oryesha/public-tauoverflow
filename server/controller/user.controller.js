let UserService = require('../services/user.service')

exports.getAllUsers = async function(req,res){
  try{
    let users = await UserService.getAllUsers();
    return res.status(200).json({status: 200, data: users, message: "Succesfully Users Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.createNewUser = async function(req,res){
  console.log("WOW2");
  let user = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    program: req.body.program,
    email: req.body.email,
    image: req.body.image,
    description: req.body.description,
    skills: req.body.skills,
  };

  try{
    let createdUser = await UserService.createNewUser(user);
    return res.status(200).json({status: 200, data: createdUser, message: "Succesfully Created New User"})
  }catch(e){
    return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
  }
};
