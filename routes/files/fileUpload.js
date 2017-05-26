var express = require('express');
var app = express(); 
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var router = express.Router();

/*var DIR = './public/images/';

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

});*/

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './public/attachments/');
    },
    filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.originalname);
      /*
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
       */
    }
});

var upload = multer({ //multer settings
                storage: storage
            }).single('file');

/** API path that will upload the files */
router.post('/uploadFile', function(req, res, next) {
    upload(req,res,function(err){
        if(err){
          return res.end(err.toString());
        }
        res.end('File is uploaded');
    });
});

module.exports = router;
