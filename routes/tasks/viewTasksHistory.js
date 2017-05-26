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
      activity: {
        $elemMatch: {
          completed_at: {$ne: null},
          $or: [{
            task_primary: mongoose.Types.ObjectId(query._id)
          }, {
            task_secondary: mongoose.Types.ObjectId(query._id),
          }]
        }
      }
    }},
    { $lookup: {
      from: "users",
      localField: "activity.task_primary",
      foreignField: "_id",
      as: "task_primary"
    }},
    { "$sort": { "start_date": -1 } }
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