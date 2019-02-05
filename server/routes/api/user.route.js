let express = require('express');

let router = express.Router();

let UserController = require('../../controller/user.controller');

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.post('/',UserController.createNewUser);
router.put('/', UserController.updateUser);
router.put('/update-favorite', UserController.updateFavorites);
router.put('/update-my-courses', UserController.updateMyCourses);

module.exports = router;
