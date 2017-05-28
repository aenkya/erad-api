var express = require('express');
var router = express.Router();
var path = require('path');
var mongoose = require('mongoose');
var Task = require('../../models/Task.js');

var task = Task();


router.put('/tasks/updateTask', function(req, res, next) {

  var input_query = {};
  if(req.body.task_id){
    input_query.task_id = req.body.task_id;
  } else {
    res.status(400).send('No task ID provided');
  }
  input_query.currently_assigned_to = req.body.task_primary?req.body.task_primary:null;
  input_query.task_primary = req.body.task_primary?req.body.task_primary:null;
  input_query.task_secondary = req.body.task_secondary?req.body.task_secondary:null;
  input_query.completed_at = req.body.completed_at?Date.now():null;
  input_query.task_comment = req.body.task_comment?req.body.task_comment:null;
  
  if (req.body.attachments.length>=1) {
    input_query.attachments = []
    for (i=0; i<req.body.attachments.length; i++) {
      input_query.attachments.push("/attachments/" + req.body.attachments[i])
    }
  }

  if(req.body.task_secondary){

    activity = {
      "task_primary": mongoose.Types.ObjectId(input_query.task_primary),
      "task_secondary": mongoose.Types.ObjectId(input_query.task_secondary),
      "task_comment": input_query.task_comment?{
        "commentor": input_query.task_primary,
        "details": input_query.task_comment
      }:null,
      "attachments": input_query.attachments?{
        "uploader": input_query.task_primary,
        "details": input_query.attachments
      }:null,
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
        res.status(201).send(result);
      }
    );
  } else if (req.body.completed_at){
    model = req.body.activity;
    var new_secondary;

    for (i=(model.length-1);i>=0; i--){
      if (model[i].task_secondary == req.body.task_primary){
        model[i].completed_at = Date.now();
        new_comment = {
          "commentor" : model[i].task_secondary,
          "details" : input_query.task_comment?input_query.task_comment:null
        }
        new_attachments = {
          "uploader": model[i].task_secondary,
          "details": input_query.attachments
        }
        if (new_comment.details != null){
          model[i].task_comment.push(new_comment);
        }
        if (new_attachments.details != null) {
          model[i].attachments.push(new_attachments)
          console.log(model[i].attachments)
        }
        new_secondary = model[i].task_primary;

        break;
      }
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

        res.status(201).send(result);

      }
    );
  }

});

module.exports = router;