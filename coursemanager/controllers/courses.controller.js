var CourseService = require('../services/course.service');

exports.createCourse = async function(req, res, next){
	var course = {
		name: req.body.name,
		address: req.body.address,
		notes: req.body.notes,
		tags: req.body.tags
	}

	try{
		var createdCourse = await CourseService.createCourse(course);
		return res.status(201).json({
				status: 201, 
				data: course, 
				message: "Successfully created course"
			});
	} catch (e) {
		return res.status(400).json({
			status: 400, 
			message: e.message
		})
	}
}

exports.getCourses = async function(req, res, next){
	var page = req.query.page ? req.query.page : 1;
	var limit = req.query.limit ? req.query.limit : 10;
	try {
		var courses = await CourseService.getCourses({}, page, limit);
		return res.status(200).json({
			status: 200, 
			data: courses, 
			message: "Successfully retrieved courses"
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			message: e.message
		});
	}
}

exports.updateCourse = async function(req, res, next){

	var course = {
		id: req.body._id,
		name: req.body.name ? req.body.name : null,
		address: req.body.address ? req.body.address: null,
		notes: req.body.notes ? req.body.notes: null,
		tags: req.body.tags ? req.body.tags: null
	}
	try {
		var updated = await CourseService.updateCourse(course);
		if (updated) {

			return res.status(200).json({
				status: 200,
				data: updated,
				message: "Successfully updated course"
			});	
		} else {
			throw Error("crap");
		}
	} catch (e) {
		return res.status(400).json({
			status: 400,
			message: "Unable to update"
		});
	}
}

exports.deleteCourse = async function(req, res, next){
	var id = req.params.id;
	try{
		var deleted = await CourseService.deleteCourse(id);
		return res.status(204).json({
			status: 204,
			message: "Course successfully deleted"
		});
	} catch (e) {
		return res.status(400).json({
			status: 400,
			message: e.message
		})
	}
}