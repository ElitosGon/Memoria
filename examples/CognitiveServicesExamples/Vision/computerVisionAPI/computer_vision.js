require('dotenv').load();
var rp = require('request-promise');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
var accessKey = process.env.COMPUTER_VISION_API_KEY;

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace 
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
var uri = process.env.COMPUTER_VISION_API_ENDPOINT;


module.exports = {
   // Analyze image with specific analyzers.
   get_analyze_image: function(params, contentUrl, callback){
        var options = {
            method: 'POST',
            uri: uri+'/analyze?visualFeatures='+params.visualFeatures+'&details='+params.details+'&language='+params.language,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: {url: contentUrl},
            json: true
            
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body__ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body__);
                return callback(null, body__);
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                return callback(err__, null);
        }); 
   },
}

