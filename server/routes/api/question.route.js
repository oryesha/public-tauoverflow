let express = require('express');

let router = express.Router();

let QuestionController = require('../../controller/question.controller');

router.get('/', QuestionController.getAllQuestions);
router.get('/interested-users/', QuestionController.getInterestedUsers);
router.get('/:id', QuestionController.getQuestion);
router.post('/', QuestionController.createQuestion);
router.put('/', QuestionController.updateQuestion);
router.delete('/:id',QuestionController.removeQuestion);

module.exports = router;
