var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Division = require('../../models/division.js');

//Structure
router.post('/departments/divisions/create', function(req, res, next){
  var missing = 'missing';
  var check= '';

  //verify singularity
  Division.findOne({
    'division_name': req.body.division_name
  }, function (err, division){
    if(!division){

      var newDivision = new Division();

      req.body.division_name?newDivision.division_name=req.body.division_name:check=missing;
      newDivision.division_description    = req.body.description;

      if(check==='missing'){
        res.status(403).send({success: false, message:'Division information missing'});
        return;
      }

      newDivision.save(function(err, post){
        if(err){
          return next(err);
        }
        res.json('Save successfull ! <br>' + post);
      });
    } else {
      res.status(403).send({success: false, message:'Registration Failed. Division already exists!'});
    }
  });
  
});

module.exports = router;
