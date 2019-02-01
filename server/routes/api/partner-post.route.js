let express = require('express');

let router = express.Router();

let PartnerPostController = require('../../controller/partner-post.controller');

router.get('/', PartnerPostController.getAllPartnerPosts);
router.post('/',PartnerPostController.createPartnerPost);
router.delete('/:id',PartnerPostController.deletePartnerPost);

module.exports = router;
