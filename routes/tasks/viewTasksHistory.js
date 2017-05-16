var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

var task = Task();

router.get('/viewTasks/history/:id', function(req, res, next) {
  var activity = task.activity;
  var query={}; 
  query._id = req.params.id;
  query.latest_date = Date.now() - 1*1000 * 60 * 60 * 24 * 7;
  console.log(query._id)
  console.log(query.latest_date)
  Task.aggregate([
    { $match: {
      currently_assigned_to: mongoose.Types.ObjectId(query._id)
    }},
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
        console.log(result)
        res.status(201).send(result)
      }
    });
});

module.exports = router;