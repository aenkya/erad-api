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
    { $match: {created_by: mongoose.Types.ObjectId(query.created_by)}},
    { $match: {completed_at: null}},
    { $unwind: {path: '$created_by', preserveNullAndEmptyArrays: true}},
    { $lookup: {
      from: "users",
      localField: "created_by",
      foreignField: "_id",
      as: "created_by"
    }},
    { $unwind: {path: '$attachments', preserveNullAndEmptyArrays: true}}
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