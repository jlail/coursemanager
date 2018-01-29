var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var courseSchema = new mongoose.Schema({
	name	: String,
	address	: {
		street	: String,
		city	: String,
		state	: String,
		zip		: Number
	}, 
	notes	: String,
	tags	: [{
		display: String,
		value: String
	}]
});

courseSchema.plugin(mongoosePaginate);
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;