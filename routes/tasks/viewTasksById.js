var express = require('express');
var router = express.Router();
var config = require('../../config/config.js');
var mongoose = require('mongoose');
var Task = require('../../models/Task.js');


router.get('/viewTasks/:id', function(req, res, next) {
  Task.findById(req.params.id, function (err, post) {
    if (err) 
    	return next(res.json('No task with that ID'));
    res.json(post);
  });
});

module.exports = router;