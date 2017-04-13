var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({
  dest: __dirname + '../public/uploads/',
  limits: {files:2}
  });
var uploadFunc = upload.fields([{name: 'attachments', maxCount: 2}]);

var mongoose = require('mongoose');
var Task = require('../../models/Task.js');


router.put('/tasks/updateTask', uploadFunc, function(req, res, next) {
  var input_query = {};
  input_query.task_id = req.body.task_id;
  input_query.activity_id = req.body.activity_id;
  input_query.currently_assigned_to = req.body.task_primary?req.body.task_primary:null;

  modified_activity = {
    "task_primary": mongoose.Types.ObjectId(req.body.activity.task_primary),
    "task_secondary": mongoose.Types.ObjectId(req.body.activity.task_secondary),
    "task_comment": "test",
  }

  if(req.body.task_secondary){
    input_query.task_comment = req.body.task_comment?req.body.task_comment:null;
    input_query.task_primary = req.body.task_primary?req.body.task_primary:null;
    input_query.task_secondary = req.body.task_secondary?req.body.task_secondary:null;
    input_query.completed_at = null;

    activity = {
      "task_primary": mongoose.Types.ObjectId(input_query.task_primary),
      "task_secondary": mongoose.Types.ObjectId(input_query.task_secondary),
      "task_comment": input_query.task_comment,
      "created_at": input_query.created_at,
      "completed_at": null
    };

    Task.update(
      { "_id" : mongoose.Types.ObjectId(input_query.task_id)  },
      { 
        $set: { 
          "currently_assigned_to": input_query.task_secondary 
        },
        $push : { 
          "activity" :  activity
        }
      },
      function (err, result) {
        if (err){
          throw err;
        }
        console.log(result)
        res.status(201).send(result);
      }
    );
  } else if (req.body.completed_at){
    input_query.completed_at = Date.now()

    Task.update(
      { 
        "_id" : mongoose.Types.ObjectId(input_query.task_id),
        "activity": null
      },
      { 
        $set: { 
          "activity": modified_activity 
        }
      },
      function (err, result) {
        if (err){
          throw err;
        }
        console.log(input_query.completed_at + result)
        res.status(201).send(result);
      }
    );
  }

});

module.exports = router;