var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');

var User = require('../../models/user.js');
var user = new User();

//Get User Details
router.post('/user/subjects', function(req, res, next){
  var query={};
  if(req.body.user_permission){
    query.user_permission = parseInt(req.body.user_permission); //convert value to Integer
    query.user_department = req.body.user_department;

    User.aggregate(
      [
        { $match: {
          user_permission: { $lt: query.user_permission},
          department: mongoose.Types.ObjectId(query.user_department),
          is_active: true
        }}
        ,
        { $sort : { user_permission : -1 } },
        { $project: { "is_active": 1, "gender": 1, "profile_pic_url": 1, "first_name": 1, "last_name": 1, "local": 1, "user_permission":1, "department":1 } }
      ], 
      function (err, result) {
        if (err) {
          throw err;
          return;
        }
        if(!user){
          res.status(404).send({message:'User not found'});
        } else if (user) {
          res.status(201).send(result);
        }
      }
    );

  }
});


module.exports = router;