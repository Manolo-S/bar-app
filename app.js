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
var barsGoing = require('./routes/barsGoing');
var auth = require('./routes/auth');

var app = express();
var Mongostore = require('connect-mongo')(session);

var Yelp = require('yelp');
 
var yelp = new Yelp({
  consumer_key: 'DvCeGUNvObAY5Qo7QgPybQ',
  consumer_secret: 'ZH-q_0IyR3wNCoE7X9X6aRsO2kY',
  token: 'fGVXemK22q4JKVp_mTVbrOONkEeNa7zs',
  token_secret: 'RM2kWtLwjpzyjV1vAq61EGAVcas',
});

app.use(bodyParser.urlencoded({extended:true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
	secret: 'anything',
	store: new Mongostore({
		url: 'mongodb://piet:snot@ds025389.mlab.com:25389/local-bars'
	})	
}));

require('./config/passport')(app);

app.use('/', index);
app.use('/search', search);
app.use('/going', going);
app.use('/barsgoing', barsGoing);
app.use('/auth', auth);


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


