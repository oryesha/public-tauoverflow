let Program = require('../models/program.model');



_this = this;

exports.getAllPrograms = async function() {
  console.log('starting service get all programs');
  try {
    const programs = await Program.find({}).sort({name: 1});
    return programs;
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
