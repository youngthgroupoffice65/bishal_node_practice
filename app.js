var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

var config = require('./config');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = {
  	status: 404,
  	message: "Not Found",
  }
});

// error handler
app.use(function(err, req, res, next) {
  var status = err.status || 400;
  res.status(status).json({
  	message:err.message || err,
  })
});

app.listen(config.app.port,function(err,done){
  if(err){
  	console.log('error occur at port'+ config.app.port);
  }else{
  	console.log("Start at the port "+ config.app.port);
  }
})

module.exports = app;
