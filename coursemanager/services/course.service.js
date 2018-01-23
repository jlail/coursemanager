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

exports.getCourses = async function(query, page, limit){
	var options = {
		page,
		limit
	}

	try {
		var courses = await Course.paginate(query, options);
		return courses;
	} catch (e) {
		throw Error('Error paginating courses');
	}
}

exports.updateCourse = async function(course){
	var id = course.id;
	console.log("ID:::::::::::::::::", course);
	try {
		var courseToUpdate = await Course.findOne({_id: mongoose.Types.ObjectId(id)});
		console.log("COURSE: ", courseToUpdate);
	} catch (e) {
		throw Error('Error finding course in update');
	}

	if (!courseToUpdate){
		return false;
	}

	for (dataField in course){
		if (course[dataField] != null){
			courseToUpdate[dataField] = course[dataField];
		}
	}

	try {
		var savedCourse = await Course.update(courseToUpdate);
		return savedCourse;
	} catch (e) {
		console.log(e.message);
		throw Error('Error while saving in update');
	}
}

exports.deleteCourse = async function(id){
	try {
		console.log("ID:", id);
		var deleted = await Course.remove({_id: mongoose.Types.ObjectId(id)});
		console.log("DELETED: ", deleted);
		if(deleted.n === 0){
			throw Error("Could not delete course");
		}
		return deleted;
	} catch (e){ 
		throw Error('Error occured while trying to delete course');
	}
}