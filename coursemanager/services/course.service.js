var mongoose = require('mongoose');
var Course = require('../models/course.model');

exports.createCourse = async function(course){
	var newCourse = new Course({
		name: course.name,
		address: course.address,
		notes: course.notes,
		tags: course.tags
	});

	try {
		var savedCourse = await newCourse.save();

		return savedCourse;
	} catch (e) {
		throw Error('Error creating new course: ', e);
	}
}

exports.deleteCourse = async function(id){
	try{
		console.log("ID:", id);
		var deleted = await Course.remove({_id: mongoose.Types.ObjectId(id)});
		console.log("DELETED: ", deleted);
		if(deleted.n === 0){
			throw Error("Could not delete course");
		}
		return deleted;
	} catch (e){ 
		console.log("E:::: ", e);
		throw Error("Error occured while trying to delete course");
	}
}