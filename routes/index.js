var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Receipt Sheep - Home' });
});

router.get('/queue', function(req, res, next) {
  res.render('queue', { title: 'Receipt Sheep - Queue' });
});

router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Receipt Sheep - Upload' });
});

router.post('/data', function(req, res, next) {
  console.log(req.body);
  if (req.body.id.length===0)
    res.send('No id');
  var id = parseInt(req.body.id,10);
  var json = req.dbjson[id];
  Object.keys(req.body).map(function(key){
    if (key!= 'id') {
      json[key]=req.body[key];
    }
  });

  //console.log(req.files);
  //console.log(req);
  res.send('Success');
});


router.get('/data', function(req, res, next) {
  res.json(req.dbjson);
});

router.delete('/data/:id',function(req, res, next) {
  delete req.dbjson[req.params.id];
  res.send("Deleted");
});

module.exports = router;
