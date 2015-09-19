var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Receipt Sheep - Home' });
});

router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Receipt Sheep - Upload' });
});

router.get('/queue', function(req, res, next) {
  res.render('queue', { title: 'Receipt Sheep - Queue' });
});

router.get('/callback', function(req, res, next){
	res.render('callback');
})

module.exports = router;
