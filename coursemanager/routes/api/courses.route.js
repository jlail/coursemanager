var express = require('express');
var CourseController = require('../../controllers/courses.controller');

var router = express.Router();

router.post('/', CourseController.createCourse);
router.get('/', CourseController.getCourses);
router.put('/', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);





module.exports = router;