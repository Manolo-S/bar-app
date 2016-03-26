var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoingSchema = new Schema({
	id: String,
	socialMedia: String,
	_id: false
});

var BarSchema = new Schema({
	date: String,
	barName: String,
	address: String,
	going: [GoingSchema]
});

module.exports = mongoose.model('bar', BarSchema);

