let express = require('express');
let router = express.Router();

let FileUploadController = require('../../controller/file-upload.controller');

router.post('/', FileUploadController.uploadImage);

module.exports = router;
