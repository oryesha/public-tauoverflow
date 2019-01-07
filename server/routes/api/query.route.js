let express = require('express');

let router = express.Router();

let QueryController = require('../../controller/query.controller');

router.get('/',QueryController.getQueryResults);
module.exports = router;
