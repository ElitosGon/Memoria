require('dotenv').load();
var rp = require('request-promise');
var parseString = require('xml2js').parseString;

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
var accessKey = process.env.TRANSLATOR_TEXT_API_KEY;

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace 
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
var uri_token = process.env.TRANSLATOR_TEXT_API_ENDPOINT;
var token_path = '/sts/v1.0/issueToken';
var path = 'https://api.microsofttranslator.com/v2/http.svc/Translate?appid=';

module.exports = {
   get_token: function(callback){
        var options = {
            method: 'POST',
            uri: 'https://api.cognitive.microsoft.com/sts/v1.0/issueToken',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/jwt',
                'Ocp-Apim-Subscription-Key': accessKey,
            }
        };

        var res = rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body__ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body__);
                body__ = body__.replace(/\"/g,'');
                return callback(null, body__);
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                return callback(err__, null);
        }); 


   },
   get_translation: function(text, from, to, token, callback) {
        var accessToken = "Bearer " + token;
        var options = {
            method: 'GET',
            uri: path+accessToken+'&text='+text+'&from='+from+'&to='+to,
            headers: {
                'Content-Type': 'text/plain',
                'Accept': 'text/plain'
            }
        }

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...                
                parseString(parsedBody, function (err, result) {

                    var textoTraducido = JSON.parse(JSON.stringify(result));
                    console.dir('texto traducido ' + textoTraducido.string._);

                    return callback(null, textoTraducido.string._);

                });
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                return callback(err__, null);
        }); 
   }
}

