let express = require('express');

let router = express.Router();

let QuestionController = require('../../controller/question.controller');

const questionController = new QuestionController();

router.get('/', questionController.getAllQuestions);
router.post('/', questionController.createQuestion);
router.put('/', questionController.updateQuestion);
router.delete('/:id',questionController.removeQuestion);

module.exports = router;
