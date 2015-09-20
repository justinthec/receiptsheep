var express = require('express');
var router = express.Router();
var multer = require('multer');
var fs = require('fs');
var parser = require(__dirname + '/../lib/parser.js');


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
  var id = parseInt(newFileName, 10);
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
  expenseJSON.id = id;

    //parser json file goes here
    var ocrscript = require('../lib/ocrscript');


    function runAfterOCR() {
      var file = fs.readFileSync(__dirname + '/../lib/temp.txt', 'utf8');
      console.log("file: " + file);
      expenseJSON.full_text = file;
      dbjson[id]=expenseJSON; //Test

      // Add expense attributes
      expenseJSON.business_name = parser.parseBusinessName(file);
      expenseJSON.phone_number = parser.parsePhoneNumber(file);
      expenseJSON.address = parser.parseAddress(file);
      expenseJSON.total_price = parser.parseTotalPrice(file);
      expenseJSON.line_items = parser.parseLineItems(file);
      res.send(JSON.stringify(expenseJSON));
    }
    // The following references the above callback
    ocrscript.runOCR('./public/scans/'+newFileName, './lib/temp.txt', runAfterOCR);


}]);

module.exports = router;
