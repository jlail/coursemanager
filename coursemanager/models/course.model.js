var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var tagSchema = new mongoose.Schema({
		display: String,
		value: String
});

var courseSchema = new mongoose.Schema({
	name	: String,
	address	: {
		street	: String,
		city	: String,
		state	: String,
		zip		: Number
	}, 
	notes	: String,
	tags	: [tagSchema]
});

courseSchema.index({
	name: 'text', 
	'address.street': 'text',
	'address.city': 'text',
	'address.state': 'text',
	notes: 'text',
	'tags.display': 'text'
});
courseSchema.plugin(mongoosePaginate);
const Course = mongoose.model('Course', courseSchema);
module.exports = Course;