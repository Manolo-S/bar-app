'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var barModel = require('./config/barModel');

var index = require('./routes/index');
var search = require('./routes/search');
var going = require('./routes/going');
// var auth = require('./routes/auth');

var app = express();
// var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')

var Yelp = require('yelp');
 
var yelp = new Yelp({
  consumer_key: 'DvCeGUNvObAY5Qo7QgPybQ',
  consumer_secret: 'ZH-q_0IyR3wNCoE7X9X6aRsO2kY',
  token: 'fGVXemK22q4JKVp_mTVbrOONkEeNa7zs',
  token_secret: 'RM2kWtLwjpzyjV1vAq61EGAVcas',
});


app.use(bodyParser.urlencoded({extended:true}));


// require('./config/passport')(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/search', search);
app.use('/going', going);
// app.use('/auth', auth);


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

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});


// var barModel = require('./config/barModel');

// var bar = {"barName": "The Hamilton", "address": "998 Amsterdam Avenue New York", "going": [{"id": 1, "socialMedia": "Twitter"}, {"id": 9, "socialMedia": "Facebook"}]}

// console.log(mongoose.connection.readyState);

// if (mongoose.connection.readyState === 0) {
//     var db = mongoose.connect('mongodb://localhost/bar-app');
// 	// var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall');
// 	console.log('connected to db');
// 	barModel.create(bar, function(err, bar) {
																																																												// 		if (err) {				
// 			console.log('error storing bar', err)
// 		} else {
// 			mongoose.connection.close(function() {
// 				console.log('Mongoose connection disconnected');
// 			});
// 		}
// 	});
// }

