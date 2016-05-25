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
var going = false;


function personIsGoing (person){
	if (person.id === id && person.socialMedia === socialMedia){
		going = true;
	    console.log(id, "is removed from going list");
	    barModel.update({"barName": barName,"address": address}, {$pull: {going: {"id": id,"socialMedia": socialMedia}}}, cb);
	}
}

function callback(err, bar) {
	if (bar[0] === undefined) {
		console.log('no one going to this bar, yet');
		barModel.create(barGoing, cb);
	}	else {
			var bar = bar[0];
			if (bar.date !== date() ){
				console.log('data ongelijk');
				barModel.update({"barName": barName,"address": address}, {"date": date(), "going": [{"id": id, "socialMedia": socialMedia}]}, cb);
			}	else {
					console.log('callback bar', bar);
					bar.going.map(personIsGoing);
					if (!going){
						console.log(id, 'is added to going list');
						barModel.update({"barName": barName,"address": address}, {$push: {going: {"id": id,"socialMedia": socialMedia}}}, {upsert: true}, cb);
					} else {
						going = false; //reset going 
					}
				}
		}
}

function cb (err, result) {
	if (err) {
		console.log(error);
	} else {
		console.log(result);
	  };
	mongoose.connection.close(function() {console.log('Mongoose connection disconnected')});
}


function findBar() {
	console.log('findBar() called')
	// if (mongoose.connection.readyState === 0) {
		var db = mongoose.connect('mongodb://piet:snot@ds025389.mlab.com:25389/local-bars');
		// var db = mongoose.connect('mongodb://piet:snot@ds047722.mlab.com:47722/pic-wall')
		// var db = mongoose.connect('mongodb://localhost/bar-app');
		barModel.find({"barName": barName,"address": address}, callback);
	// }
}

function date(){
	var dateObj = new Date();
    var date = dateObj.getMonth() + "/" + dateObj.getDate() + "/" + dateObj.getFullYear();
	return date;
}

router.post('/', function(req, res) {
	barName = req.body.barName;
	address = req.body.address;
	id = req.body.id;
	socialMedia = req.body.socialMedia;
	barGoing = {"barName": barName,	"address": address, "date": date(), "going": [{"id": id,"socialMedia": socialMedia}]};
	findBar();
});

module.exports = router;