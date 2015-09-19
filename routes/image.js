var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({
    dest: './image-dir/',
    limits: {fileSize: 10000000, files:1}
});


/* GET image listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', [upload, function(req, res, next) {

  console.log(req.files);


  res.send('Success');
}]);

module.exports = router;
