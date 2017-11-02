require('dotenv').load();
var rp = require('request-promise');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
var accessKey = process.env.TEXT_ANALITYCS_API_KEY;

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace 
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
var uri = process.env.TEXT_ANALITYCS_API_ENDPOINT;
var path = '/text/analytics/v2.0/keyPhrases';

module.exports = {
   get_key_phrases: function(documents, callback) {
        
        var options = {
            method: 'POST',
            uri: 'https://'+uri+path,
            headers: {'Ocp-Apim-Subscription-Key' : accessKey},
            body: documents,
            json: true // Automatically stringifies the body to JSON
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body__ = JSON.stringify (parsedBody, null, '  ');
                console.log(body__);
                callback(null, body__);
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                callback(err__, null);
        });
   }
}

