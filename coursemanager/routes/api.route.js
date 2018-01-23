var express = require('express');
var courses = require('./api/courses.route');

var router = express.Router();

router.use('/courses', courses);

module.exports = router;