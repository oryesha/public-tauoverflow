let express = require('express');

let router = express.Router();

let ChangeHoursController = require('../../controller/change-hours.controller');
router.get('/',ChangeHoursController.getAllChangeHours);
router.post('/',ChangeHoursController.createPost);
router.delete('/:id',ChangeHoursController.deleteChangeHoursPost);
module.exports = router;
