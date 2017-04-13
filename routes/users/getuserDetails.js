var express = require('express');

var router = express.Router();
var mongoose = require('mongoose');

var User = require('../../models/user.js');
var Role = require('../../models/role.js');
var UserMapping = require('../../models/user-mapping.js');
var user = new User();
var role = new Role();
var userMapping = new UserMapping();
var config = require('../../config/config.js');

//Get User Details
router.get('/user/:id', function(req, res, next){
	var query={};
	if(req.params.id){
		query.user_id = req.params.id;

		User.aggregate(
      [
        { $lookup: {
        	from: "roles",
        	localField: "role",
        	foreignField: "_id",
        	as: "role"
        }},
        { $match: {_id: mongoose.Types.ObjectId(query.user_id)}},
        { $unwind: {path: '$role', preserveNullAndEmptyArrays: true}}
        ,
        { $project: { "is_active": 1, "gender": 1, "profile_pic_url": 1, "first_name": 1, "last_name": 1, "local": 1,"role": {"_id": 1, "role_name": 1}, "user_permission":1, "department":1, "division": 1, "unit":1 } }
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