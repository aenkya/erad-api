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
  if(req.body.task_id){
    input_query.task_id = req.body.task_id;
  } else {
    res.status(400).send('No task ID provided');
  }
  console.log(req.body.task_primary)
  input_query.currently_assigned_to = req.body.task_primary?req.body.task_primary:null;
  input_query.task_comment = req.body.task_comment?req.body.task_comment:null;
  input_query.task_primary = req.body.task_primary?req.body.task_primary:null;
  input_query.task_secondary = req.body.task_secondary?req.body.task_secondary:null;
  input_query.completed_at = req.body.completed_at?Date.now():null;

  if(req.body.task_secondary){

    activity = {
      "task_primary": mongoose.Types.ObjectId(input_query.task_primary),
      "task_secondary": mongoose.Types.ObjectId(input_query.task_secondary),
      "task_comment": input_query.task_comment,
      "task_comment": {
        "commentor": input_query.task_primary,
        "details": input_query.task_comment
      },
      "created_at": Date.now(),
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
    model = req.body.activity;
    var new_secondary;

    if (input_query.task_comment===null) {
      for (i=(model.length-1);i>=0; i--){
        if (model[i].task_secondary == req.body.task_primary){
          model[i].completed_at = Date.now();
          new_secondary = model[i].task_primary;
          break;
        }
      }
    } else {
      added_comment = {
        "task_primary": mongoose.Types.ObjectId(input_query.task_primary),
        "task_secondary": mongoose.Types.ObjectId(input_query.task_secondary)
      }
      for (i=(model.length-1);i>=0; i--){
        if (model[i].task_secondary == req.body.task_primary){
          model[i].completed_at = Date.now();
          new_comment = {
            "commentor" : model[i].task_primary,
            "details" : input_query.task_comment
          }
          model[i].task_comment.push(new_comment);
          new_secondary = model[i].task_primary;
          console.log(new_secondary)
          break;
        }
      }
      model.push()
    }

    Task.update(
      { 
        "_id" : mongoose.Types.ObjectId(input_query.task_id)
      },
      { 
        $set: { 
          "activity": model,
          "currently_assigned_to": mongoose.Types.ObjectId(new_secondary)
        }
      },
      function (err, result) {
        if (err){
          throw err;
        }
        res.status(503).send({'message':'service unavailable'});
      }
    );
  }

});

module.exports = router;