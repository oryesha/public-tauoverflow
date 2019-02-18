let Program = require('../models/program.model');



_this = this;

exports.getAllPrograms = async function() {
  console.log('starting service get all programs');
  try {

    let programsToSend = [];

    const programs = await Program.find({});

    programs.forEach((program) => {
      programsToSend.push({id: program._id, programName: program.name});
    });
    return programsToSend;
  } catch (e) {
    throw Error('Error while getting all programs')
  }
};


exports.createProgram = async function(program){
    let newProgram = new Program({
      name: program.name,
    });

    try{
      let savedProgram = await newProgram.save();
      return savedProgram;
    }catch(e){
      throw Error("Error while Creating program")
    }
};
