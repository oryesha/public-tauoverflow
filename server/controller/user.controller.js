let UserService = require('../services/user.service')
let ServiceHelper = require('../services/serviceHelper')

exports.getAllUsers = async function(req,res){
  try{
    let users = await UserService.getAllUsers();
    return res.status(200).json({status: 200, data: users, message: "Succesfully Users Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.getUser = async function(req,res) {
  try{
    let users = await UserService.getUser(req.params.id);
    return res.status(200).json({status: 200, data: users, message: "Succesfully User Recieved by id"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};


exports.updateUser = async function(req,res){

  if(!req.body.firebaseToken){
    return res.status(400).json({status: 400., message: "Id must be present"})
  }

  let token = req.body.firebaseToken;

  let user = {
    firebaseToken: token,
    firstName: req.body.firstName ? req.body.firstName : null,
    lastName: req.body.lastName ? req.body.lastName : null,
    program: req.body.program ? req.body.program : null,
    email: req.body.email ? req.body.email : null,
    rank: req.body.rank ? req.body.rank : null,
    image: req.body.image ? req.body.image : null,
    asked: req.body.asked ? req.body.asked : null,
    answered: req.body.answered ? req.body.answered : null,
    description: req.body.description ? req.body.description : null,
    skills: ServiceHelper.getIdsFromList(req.body.skills),
    //add all after debug
  };

  try{
    let updatedUser = await UserService.updateUser(user);
    return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User: " + token})
  }catch(e){
    return res.status(400).json({status: 400., message: e.message})
  }
};

exports.createNewUser = async function(req,res){
  let user = {
    firebaseToken: req.body.firebaseToken,
    firstName: req.body.name.first,
    lastName: req.body.name.last,
    program: req.body.program,
    email: req.body.email,
    image: req.body.image,
    description: req.body.description,
    skills: req.body.skills
  };

  try{
    let createdUser = await UserService.createNewUser(user);
    return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created New User"})
  }catch(e){
    return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
  }
};
