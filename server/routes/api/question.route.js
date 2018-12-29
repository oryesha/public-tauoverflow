let express = require('express');

let router = express.Router();

let QuestionController = require('../../controller/question.controller');

router.get('/', QuestionController.getAllQuestions);
router.post('/', QuestionController.createQuestion);
router.put('/', QuestionController.updateQuestion);
router.delete('/:id',QuestionController.removeQuestion);

module.exports = router;
