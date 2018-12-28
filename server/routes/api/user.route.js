let express = require('express');

let router = express.Router();

let UserController = require('../../controller/user.controller');

router.post('/',UserController.createNewUser);
module.exports = router;
