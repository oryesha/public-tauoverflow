let express = require('express');

let router = express.Router();

let UserController = require('../../controller/user.controller');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.post('/',UserController.createNewUser);

module.exports = router;
