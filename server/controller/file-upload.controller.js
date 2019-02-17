let FileUploadService = require('../services/file-upload.service');

exports.uploadImage = async function(req, res) {
  try {
    const fileLocation = await FileUploadService.uploadImage(req, res);
    return res.status(200).json({imageUrl: fileLocation});
  } catch (e) {
    return res.status(400).json(e);
  }
};
