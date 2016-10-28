var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

/* GET /tasks listing */
router.post('/createTask', function(req, res, next){
	Task.create(req.body, function(err, post){
		if(err)
			return next(err);
		res.json(post);
	});
});


/**
 * TODO: POST route configuration
 */
module.exports = router;