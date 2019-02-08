let express = require('express');

let router = express.Router();

let NotificationController = require('../../controller/notification.controller');

router.get('/:id',NotificationController.getUserNotifications);
router.put('/',NotificationController.updateNotification);
router.post('/:id',NotificationController.addNotification);
router.delete('/:id',NotificationController.deleteNotification);

module.exports = router;
