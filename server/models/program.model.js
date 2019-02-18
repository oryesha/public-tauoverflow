let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');


const ProgramSchema = new mongoose.Schema({
  name: String,
});

ProgramSchema.plugin(mongoosePaginate);
const Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;
