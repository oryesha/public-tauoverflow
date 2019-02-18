let express = require('express');

let router = express.Router();

let ProgramController = require('../../controller/program.controller');

router.post('/', ProgramController.createProgram);
router.get('/', ProgramController.getAllPrograms);

module.exports = router;
