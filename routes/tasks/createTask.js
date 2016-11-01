var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');
var task = new Task();

/* GET /tasks listing */
router.post('/createTask', function(req, res, next){

	//picking post details for the task
	task.task_name	=	req.body.task_name;
	task.category = req.body.category;
	task.note = req.body.note;
	task.created_by = req.body.created_by;

	//recording task creation time
	task.created_at = Date.now();

	task.save(function(err, post){
		if(err)
			return next(err);
		res.json(post);
	});
	
});


/**
 * TODO: POST route configuration
 */
module.exports = router;