var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

/* GET searched for items */
router.get('/searchTask', function(req, res, next) {
//	var name = req.params.task_name;
var name = 'postman task storage';
	Task.findOne({taskName: new RegExp('^'+name+'$', "i")}, function(err, post) {
	  if (err){
	  	console.log(err);
	  	return next(err);
	  }
	    res.send(post);
	    console.log(post);
	});
});

module.exports = router;