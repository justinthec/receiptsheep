var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var ocrscript = require('../lib/ocrscript');


var upload = multer({
    dest: './public/scans/',
    limits: {fileSize: 10000000, files:1}
});


/* GET image listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', [upload, function(req, res, next) {

  console.log(req.files);

  var filename = req.files.image.name;
  var extension = filename.split('.')[filename.split('.').length-1];
  console.log(filename);
  var newFileName = (new Date().getTime())+"."+extension;
  console.log(newFileName);

  fs.renameSync('./public/scans/'+filename,
    './public/scans/'+ newFileName/*,
    function(err) {
      if (err) {
        //handle
      }
      console.log("renamed "+filename+" to "+newFileName);
  }*/);

  var dbjson = req.dbjson;
  var expenseJSON = {};
  expenseJSON.imageLocation = '/scans/'+newFileName;
  expenseJSON.id = parseInt(newFileName, 10);

    //parser json file goes here
    ocrscript.runOCR('./public/scans/'+newFileName, __dirname + '/../lib/temp.txt');
    var file = fs.readFileSync(__dirname + '/../lib/temp.txt', 'utf8');
    expenseJSON.text = file;



  dbjson.push(expenseJSON); //Test


  res.send(JSON.stringify(expenseJSON));
}]);

module.exports = router;
