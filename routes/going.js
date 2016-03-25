'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var barModel = require('../config/barModel');
var barGoing;
var barName;
var address;
var id;
var socialMedia;

function callback(err, bar) {
	if (bar[0] === undefined) {
			console.log('no one going to this bar, yet');
			barModel.create(barGoing, function(error, barnew) {
				if (error) {
					console.log('error storing bar', error)
					mongoose.connection.close(function() {
		        	console.log('Mongoose connection disconnected');
		        	});
				} else {
							console.log('barcreate called');
							mongoose.connection.close(function() {
								console.log('Mongoose connection disconnected');
						    });
					    }
	           });
	} else {
       		   barModel.update( {"barName": barName, "address": address}, { $push : { going : {"id": id, "socialMedia": socialMedia} } })
	}
}


function findBar() {
	console.log('findBar() called')
	if (mongoose.connection.readyState === 0) {
		// var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
		var db = mongoose.connect('mongodb://localhost/bar-app');
		// barModel.find({}, callback);
		barModel.find({
			"barName": barName,
			"address": address
		}, callback);
	}
}

router.post('/', function(req, res) {
	barName = req.body.barName;
	address = req.body.address;
	id = req.body.id;
	socialMedia = req.body.socialMedia;
    barGoing = {"barName": barName, "address": address, "going": [{"id": id, "socialMedia": socialMedia}]}
    console.log('barGoing', barGoing);
	// console.log(barName, address, id, socialMedia);
	// console.log('address type', typeof(address));
	findBar();
});

module.exports = router;


// picModel.find({}, function(err, picsData){
// 		allPics = picsData[0];
// 		mongoose.connection.close(function(){
// 			console.log('Mongoose connection disconnected');
// 		});
// 		next();
// 	 });

// function callback(){
// 	console.log('callback', allPics)
// 	picModel.create({
// 		pics: allPics
// 	}, function(err, pics){
// 			if (err) {
// 				console.log('error storing pics array', err) 
// 			} else {
// 				mongoose.connection.close(function() {
// 		            console.log('Mongoose connection disconnected');
// 	    		});
// 			}
// 	   } 
//  	);
// }


// function storePic(){
// 	console.log('store pic fun called')
// 	// if (mongoose.connection.readyState === 0) { 
// 		var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
// 		// var db = mongoose.connect('mongodb://localhost/pic-wall');
// 		picModel.remove({}, callback);
// 	// }
// }