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
		return await newCourse.save();
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
		// Will not match partial strings for now, need to search with regex for that
		if (query.search){
			var searchQuery = {
				$text: {
					$search: query.search
				}
			}
			return await Course.paginate(searchQuery, options);
		}
		return await Course.paginate(query, options);
	} catch (e) {
		throw Error('Error paginating courses');
	}
}

exports.updateCourse = async function(course){
	var id = course.id;
	delete course[id];
	console.log("COURSE: ", course);

	return await Course.findByIdAndUpdate(course.id, course);
}

exports.deleteCourse = async function(id){
	try {
		var deleted = await Course.remove({_id: mongoose.Types.ObjectId(id)});
		if(deleted.n === 0){
			throw Error("Could not delete course");
		}
		return deleted;
	} catch (e){ 
		throw Error('Error occured while trying to delete course');
	}
}