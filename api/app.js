/// <reference path="typings/node/node.d.ts"/>
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var routes = require('./routes/baseRoute');
var expressValidator = require('express-validator');
var cors = require('cors');

var app = express();
var basicLogin = require('./functions/logic/basic');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//validate request
//app.all('/api/v1/*', [require('./middleware/validateRequest')]);

//route the request
app.use('/api/v1/', routes);
app.use('/signup', basicLogin.signUp);
app.use('/login', basicLogin.loginUser);
app.use('/getAllUsers', basicLogin.getAllUsers);



app.use('/',function(req,res){
	res.json(
		{
		"name":"hello World"
		});
});

// catch 404 and forward to respective handler
app.use(function(req,res,next){
	var err= new Error('Not Found');
	err.status=404;
	next(err); 
});

// Dev error handler
if (app.get('env') === 'development') {
	app.use(function(err,req,res,next){
	    res.status(err.status || 500);
	    res.render('error', {
	      message: err.message,
	      error: err
	    });			
	});
}

// Production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports=app;

