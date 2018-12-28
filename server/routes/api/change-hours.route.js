let express = require('express');

let router = express.Router();

let ChangeHoursController = require('../../controller/change-hours.controller');

router.post('/',ChangeHoursController.createPost);
module.exports = router;
