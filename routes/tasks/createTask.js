var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');


/* GET /tasks listing */
router.post('/createTask', function(req, res, next){
	var task = new Task();
	//picking post details for the task
	task.taskName	=	req.body.taskName;
	task.category = req.body.category;
	task.description = req.body.description;
	task.status = req.body.status;
	task.priority = req.body.priority;
	task.parent_id = req.body.parent_id;

	task.created_by = req.body.created_by;
	task.finished_by = req.body.finished_by;
	task.assigned_to = req.body.assigned_to;

	//recording task creation time
	task.created_at = Date.now();
	task.start_date = Date.now();
	task.completed_at = req.body.completed_at;
	task.updated_at = req.body.updated_at;


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