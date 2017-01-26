var express = require('express');
var app = express();
const jwt = require('express-jwt');
const cors = require('cors');
app.use(cors());

// We are going to implement a JWT middleware that will ensure the validity of our token. We'll require each protected route to have a valid token sent in the Authorization header
const authCheck = jwt({
  secret: new Buffer('YOUR-AUTH0-SECRET', 'base64'),
  audience: 'YOUR-AUTH0-CLIENT-ID'
});

module.exports = authCheck;
//authO app details
//domain: thesdet.auth0.com
//client ID: I7X4LiCMG15XiTRoUkOEtetQClTWa2pV
//client Secret: Hy2I8ccLYlDMbT9ahdsoC7sa6_Kj_ZAW-eQ5rSE5tRxXItcXe1oyRecdo_aWdHDw
//expiration: 36000