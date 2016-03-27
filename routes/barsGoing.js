'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var barModel = require('../config/barModel');
var bars;
var goingData;


router.use('/', function(req, res, next){
	bars = req.body.bars;
	var allbars = bars.map(function(bar){return bar.barName});
	var addresses = bars.map(function(bar){return bar.address});
	if (mongoose.connection.readyState === 0){
		// var db = mongoose.connect('mongodb://localhost/bar-app');
		var db = mongoose.connect('mongodb://piet:snot@ds025389.mlab.com:25389/local-bars')
		
	}

	barModel.find({$and:[{barName:{$in: allbars}},{address:{$in: addresses}}]}, function(err, barData){
		// console.log(barData);
		goingData = barData.map(function(bar){return {"barName": bar.barName, "numberGoing": bar.going.length}});
		console.log('goingdata', goingData);
		mongoose.connection.close(function(){
			console.log('Mongoose connection disconnected');
		});
		next();
	  });
});

router.post('/', function(req, res) {
	res.json(goingData);
});

module.exports = router;




