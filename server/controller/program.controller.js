let ProgramService = require('../services/program.service');

exports.getAllPrograms = async function(req, res) {
  try{
    let programs = await ProgramService.getAllPrograms();
    return res.status(200).json({status: 200, data: programs, message: "Succesfully All Programs Recieved"});
  }catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
};

exports.createProgram = async function(req, res) {

    let program = {
      name: req.body.name,
    };

    try{
      let createdProgram = await ProgramService.createProgram(program);
      return res.status(201).json({status: 201, data: createdProgram, message: "Succesfully Created Program"})
    }catch(e){
      return res.status(400).json({status: 400, message: "Program Creation was Unsuccesfull"})
    }
};
