var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

/* GET /tasks listing */
router.get('viewTask/:id', function(req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/viewTasks', function(req, res, next){
	Task.find(function (err, tasks){
		if(err) return next(err);
		res.json(tasks);
	})
});

/**
 * TODO: POST route configuration
 */
module.exports = router;