let express = require('express');

let router = express.Router();

let ChangeHoursController = require('../../controller/change-hours.controller');
router.get('/',ChangeHoursController.getAllChangeHours);
router.post('/',ChangeHoursController.createPost);
module.exports = router;
