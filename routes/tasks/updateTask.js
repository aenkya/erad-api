var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');


router.put('/updateTask', function(req, res, next) {
  Task.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    if (err) return next(err);
    res.status(201).send(post);
  });
});

module.exports = router;