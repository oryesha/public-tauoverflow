let UserService = require('../services/user.service')

exports.createNewUser = async function(req,res){

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
