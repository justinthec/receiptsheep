var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({
    dest: './public/images/',
    limits: {fileSize: 10000000, files:1}
});


/* GET image listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', [upload, function(req, res, next) {

  console.log(req.files);

  var filename = req.files.image.name;
  //var extension
  console.log(filename);

  //fs.rename('./public/images/'+filename, './public/images/'+ (new Date().getTime())+filename.split('.')


  res.send('Success');
}]);

module.exports = router;
