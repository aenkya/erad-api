var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

var task = Task();

router.get('/viewTasks/out/:id', function(req, res, next) {
  var attachments = task.attachments;
  var query={};
  query.created_by = req.params.id;

  Task.aggregate([
    { $match: {activity: { $elemMatch: {
      task_primary: mongoose.Types.ObjectId(query.created_by), completed_at: null}}}
    },/*
    { $unwind: {path: '$activity', preserveNullAndEmptyArrays: true}},
    { $lookup: {
      from: "users",
      localField: "activity.task_secondary",
      foreignField: "_id",
      as: "users"
    }},*/
    { "$sort": { "start_date": -1 } }
  ], function (err, result) {
      if (err) {
          throw err;
          return;
      }
      if(!task){
        res.status(404).send({message:'Tasks not found'});
      } else if (task) {
        res.status(201).send(result)
      }
    });
});

module.exports = router;
