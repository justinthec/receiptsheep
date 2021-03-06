var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var image = require('./routes/image');

var fs = require('fs');

var app = express();

var dbjson = {};
fs.readFile('db/db.json', 'utf8', function(err, data) {
  if (err || data[0] !='{') {
    // handle
    dbjson={};
  } else
    dbjson = JSON.parse(data);
});

setInterval(function() {
  fs.writeFile("db/db.json",JSON.stringify(dbjson), function(err) {
    if (err) {
      //handle
    }

  });
  console.log("Saved");
}, 10000);



function dbAdderMiddleware(req, res, next){
  req.dbjson = dbjson;
  next();
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(dbAdderMiddleware);


app.use('/', routes);
app.use('/image', image);
app.use('/queue', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
