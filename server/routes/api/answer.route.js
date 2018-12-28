let express = require('express');

let router = express.Router();

let AnswerController = require('../../controller/answer.controller');

router.post('/',AnswerController.createAnswer);
router.put('/',AnswerController.updateAnswer);
module.exports = router;
