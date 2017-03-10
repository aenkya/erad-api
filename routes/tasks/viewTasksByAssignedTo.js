var express = require('express');
var router = express.Router();

var Task = require('../../models/Task.js');
var app = express();

router.get('/viewTasks/:id', function(req, res, next) {
  Task.find({assigned_to:req.params.id, completed_at: {$exists: false}}, function (err, post) {
    if (err) 
    	return next(res.json('No tasks for that user'));
    res.json(post);
  });
});

module.exports = router;