require('dotenv').load();
var rp = require('request-promise');

var uri = process.env.BING_SPELL_CHECK_API_ENDPOINT;
var path = '/bing/v7.0/spellcheck/';


/* NOTE: Replace this example key with a valid subscription key (see the Prequisites section above). Also note v5 and v7 require separate subscription keys. */
var accessKey = process.env.BING_SPELL_CHECK_API_KEY;

// These values are used for optional headers (see below).
// var CLIENT_ID = "<Client ID from Previous Response Goes Here>";
// var CLIENT_IP = "999.999.999.999";
// var CLIENT_LOCATION = "+90.0000000000000;long: 00.0000000000000;re:100.000000000000";
module.exports = {
   get_spell_check: function(document, callback) {
        
        var query_string = '?';
        for (var param in document) {
            query_string += param + '=' + document[param] + '&';
        }
        query_string = encodeURI (query_string);

        var options = {
            method: 'POST',
            uri: 'https://'+uri+path+query_string,
            headers: {
                'Ocp-Apim-Subscription-Key' : accessKey,
    //        'X-Search-Location' : CLIENT_LOCATION,
    //        'X-MSEdge-ClientID' : CLIENT_ID,
    //        'X-MSEdge-ClientIP' : CLIENT_ID,
                    },
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




