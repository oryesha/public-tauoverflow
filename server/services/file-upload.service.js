const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: 'hI/AKJgvrXMOMlso8OTejEhAtunOXlXwNyg/+F2K',
  accessKeyId: 'AKIAJTIWRJUCCJZBTRYQ',
  region: 'us-east-1' // region of your bucket
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tauoverflow-images',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
});

const singleUpload = upload.single('file');

_this = this;

exports.uploadImage = function(req, res) {
  return new Promise((resolve, reject) => {
    singleUpload(req, res, (err, some) => {
      if (err) {
        console.error(err.message);
        reject(err);
      }
      resolve(req.file.location);
    });
  });
};
