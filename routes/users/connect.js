var express = require('express');
var app = express();
var apiRoutes = express.Router();
var mongoose = require('mongoose');
var config = require('../../config/config.js');

var connectDb = mongoose.connection;
connectDb.on('connecting', function() {
    console.log('connecting');
});

connectDb.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
    mongoose.disconnect();
});

connectDb.on('connected', function() {
    console.log('connected!');
});

connectDb.once('open', function() {
    console.log('connection open');
});
connectDb.on('reconnected', function () {
    console.log('reconnected');
});

connectDb.on('disconnected', function() {
  mongoose.connect(
    config.dbURL, 
    {
      server:{
        auto_reconnect:true, 
        socketOptions: { 
          keepAlive: 1, 
          connectTimeoutMS: 30000 
        }
      }, 
      replset: { 
        socketOptions: { 
          keepAlive: 1, 
          connectTimeoutMS : 30000 
        } 
      }
    }
  );
  }
);

mongoose.connect(config.dbURL, {server:{auto_reconnect:true}});
module.exports = apiRoutes;