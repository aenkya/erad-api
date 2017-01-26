String.prototype.format = String.prototype.f = function() {
    
    var s = this,
    i = arguments.length;
    
    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
}

function sha256Encode(stringToEncode) {
    
    var crypto = require('crypto');
    var result = crypto.createHash('sha256').update(stringToEncode).digest('hex');
    
    return result;
}

function buildAuthorizationParameters(apiKey, sharedSecret) {
    
    var seconds = Math.floor(new Date() / 1000);
    var paramsToEncode = apiKey + sharedSecret + seconds;
    var encodedParams = sha256Encode(paramsToEncode);
    
    var result = 'apikey={0}&sig={1}'.format(apiKey, encodedParams);
    
    return result;
}

function getResponseFromParameters(parameters, serverRes) {
    
    var baseUri = 'http://api.fandango.com';
    var apiVersion = '1';
    
    // Use your account-specific values here
    var apiKey = 'your_api_key';
    var sharedSecret = 'your_shared_secret';
    
    var authorizationParameters = buildAuthorizationParameters(apiKey, sharedSecret);
    
    var requestUri = '{0}/v{1}/?{2}&{3}'.format(baseUri, apiVersion, parameters, authorizationParameters);
    
    var http = require('http');
    var response = '';
    
    http.get(requestUri, function(apiRes) {
             apiRes.on('data', function(data) {
                    response += data;
                    });
             
             apiRes.on('end', function() {
                       serverRes.end(response);
                    });
             });

    return 'done';
}


var port = 8124;
var localhost = '127.0.0.1';
var startupMsg = '<=-- Load this url to see Fandango response: http://{0}:{1}    (<ctrl-c> to quit) --=>'.format(localhost, port);
console.log(startupMsg);

var http = require('http');
http.createServer(function (req, serverRes) {
                  
                  serverRes.writeHead(200, {'Content-Type': 'text/xml'});
                  
                  var zipCode = '90064';
                  var parameters = 'op=theatersbypostalcodesearch&postalcode={0}'.format(zipCode);
                  
                  getResponseFromParameters(parameters, serverRes);

}).listen(port, localhost);
