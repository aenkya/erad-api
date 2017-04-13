var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Unit = require('../../models/unit.js');

//Structure
router.post('/departments/units/create', function(req, res, next){
  var missing = 'missing';
  var check= '';

  //verify singularity
  Unit.findOne({
    'unit_name': req.body.unit_name
  }, function (err, unit){
    if(!unit){

      var newUnit = new Unit();

      req.body.unit_name?newUnit.unit_name=req.body.unit_name:check=missing;
      newUnit.unit_description    = req.body.description;

      if(check==='missing'){
        res.status(403).send({success: false, message:'Unit information missing'});
        return;
      }

      newUnit.save(function(err, post){
        if(err){
          return next(err);
        }
        res.json('Save successfull ! <br>' + post);
      });
    } else {
      res.status(403).send({success: false, message:'Registration Failed. Unit already exists!'});
    }
  });
  
});

module.exports = router;
