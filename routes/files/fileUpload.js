var express = require('express');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();

var DIR = './public/images/';

var upload = multer({dest: DIR});

var type = upload.single('myFile');

router.post('/uploadFile', type, function (req,res) {
  if (req.file) {

    var tmp_path = req.file.path;
    var target_path = DIR + req.file.originalname;

    var src = fs.createReadStream(tmp_path);
    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
    src.on('end', function() { res.end('complete'); });
    src.on('error', function(err) { res.end('error'); });

  }else{
    res.send('No file provided')
  }

});

module.exports = router;
