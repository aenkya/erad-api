var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');


router.put('/updateTask', function(req, res) {

  Task.findById(req.body._id, function(err, task) {

    task.completed_at = req.body.completed_at;
    task.attachments = req.body.attachments;

    task.save(function(err) {
      if (err){
        return res.status(406).send({message: 'failed'});
      }

      res.status(201).send({ message: 'done'});
    });

  });
});

module.exports = router;