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
	// console.log('allbars', allbars);
	// console.log('addresses', addresses);
	if (mongoose.connection.readyState === 0){
		var db = mongoose.connect('mongodb://localhost/bar-app');
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




// db.bars.find({$and:[{barName:{$in: ["The Bar Room", "The Hamilton"]}},{address:{$in:["117 E 60th St New York", "998 Amsterdam Avenue New York"]}}]});



// router.use('/', function(req, res, next){
// 	if (mongoose.connection.readyState === 0){
// 		// var db = mongoose.connect('mongodb://localhost/pic-wall');
// 		var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
// 	}

// 	picModel.find({}, function(err, picsData){
// 		allPics = picsData[0];
// 		mongoose.connection.close(function(){
// 			console.log('Mongoose connection disconnected');
// 		});
// 		next();
// 	 });
// });

// router.get('/', function(req, res){
// 	res.json(allPics);
// });
