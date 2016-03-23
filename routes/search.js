'use strict';
var express = require('express');
var router = express.Router();
var Yelp = require('yelp');
 
var yelp = new Yelp({
  consumer_key: 'DvCeGUNvObAY5Qo7QgPybQ',
  consumer_secret: 'ZH-q_0IyR3wNCoE7X9X6aRsO2kY',
  token: 'fGVXemK22q4JKVp_mTVbrOONkEeNa7zs',
  token_secret: 'RM2kWtLwjpzyjV1vAq61EGAVcas',
});

router.post('/', function(req, res){
	var searchStr = req.body.searchStr;
	console.log('search str router', searchStr);
	yelp.search({ term: 'bar', location: searchStr })
	.then(function (data) {
	  res.json(data);
	})
	.catch(function (err) {
	  console.error(err);
	});
});

module.exports = router;




