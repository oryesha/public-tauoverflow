let express = require('express');

let router = express.Router();

let PartnerPostController = require('../../controller/partner-post.controller');

router.post('/',PartnerPostController .createAnswer);
module.exports = router;
