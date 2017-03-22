var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');


/* GET /tasks listing */
router.post('/createTask', function(req, res, next){
	if(req.body.created_by){
		var task = new Task();
		//picking post details for the task
		task.taskName	=	req.body.taskName;
		task.category = req.body.category;
		task.description = req.body.description;
		task.created_at = Date.now();
		task.start_date = req.body.start_date?req.body.start_date:null;
		task.parent_id=req.body.parent_id?req.body.parent_id:null;
		task.duration = req.body.duration?req.body.duration:1*1000 * 60 * 60 * 24;

		task.created_by = req.body.created_by;
		task.assigned_to = req.body.assigned_to?req.body.assigned_to:req.body.created_by;
		task.finish_date = req.body.start_date?task.start_date+task.duration:null;

		//recording task creation time

	}
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