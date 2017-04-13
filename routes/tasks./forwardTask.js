var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');


router.put('/tasks/forwardTask/', function(req, res) {
  var input_query = {};
  input_query._id = req.body._id;
  input_query.task_primary = req.body.task_primary;
  input_query.task_secondary = req.body.task_secondary;
  input_query.task_comment = req.body.task_comment;
  input_query.created_at = Date.now();

  query = {
    "task_primary": mongoose.Types.ObjectId(input_query.task_primary),
    "task_secondary": mongoose.Types.ObjectId(input_query.task_secondary),
    "task_comment": input_query.task_comment,
    "created_at": input_query.created_at
  };

  Task.update(
    { "_id" : mongoose.Types.ObjectId(input_query._id)  },
    { 
      "$push" : { 
        "activity" :  query
      },
      $set: { 
        "currently_assigned_to": query.task_secondary 
      }
    },
    function (err, result) {
      if (err){
        throw err;
      }
      res.status(201).send(result);
    }
  );
});

module.exports = router;
