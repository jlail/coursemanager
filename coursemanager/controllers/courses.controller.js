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

exports.deleteCourse = async function(req, res, next){
	var id = req.params.id;
	console.log("attempting delete", req.params.id);
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