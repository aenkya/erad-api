var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

var task = Task();

router.get('/viewTasks/in/:id', function(req, res, next) {
  var activity = task.activity;
  var query={};
  query.assigned_to = req.params.id;

  Task.aggregate([
    { $match: {currently_assigned_to: mongoose.Types.ObjectId(query.assigned_to), completed_at: null}},
    /*{ $unwind: {path: '$activity', preserveNullAndEmptyArrays: true}},*/
    { $lookup: {
      from: "users",
      localField: "activity.task_primary",
      foreignField: "_id",
      as: "task_primary"
    }},
    { "$sort": { "created_at": -1 } }
    /**TODO: Pick the task primaries and unwind
     **/
    /*,
    { $unwind: {path: '$task_primary', preserveNullAndEmptyArrays: true}},
    { "$group": {
        "_id": "$_id",
        "task_primary": {"$first": "$first_name"}
      }
    }*/
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