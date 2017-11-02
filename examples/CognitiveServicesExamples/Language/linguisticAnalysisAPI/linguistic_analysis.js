/*
Welcome to the Linguistic Analysis APIs. These APIs provide access to natural language processing (NLP) tools that identify the structure of text. The current release provides three types of analysis:

    -   Sentence separation and tokenization
    -   Part-of-speech tagging
    -   Constituency parsing
*/
require('dotenv').load();
var rp = require('request-promise');

const accessKey = process.env.LINGUISTIC_ANALYSIS_API_KEY;
const uri = process.env.LINGUISTIC_ANALYSIS_API_ENDPOINT;
const path_get_analyze_text = '/analyze';
const path_get_list_analyzers = '/analyzers';

module.exports = {

   /* Analyze text with specific analyzers. */
   get_analyze_text: function(body, callback){
        
        var options = {
            method: 'POST',
            uri: uri + path_get_analyze_text,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
        };

        var res = rp(options)
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

   /* This API returns a list of strings representing which analyzers are currently registered. */
   get_list_analyzers: function(callback){
        var options = {
            method: 'GET',
            uri: uri + path_get_list_analyzers,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/jwt',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            json: true
        };

        var res = rp(options)
            .then(function (parsedBody) {
                // GET succeeded...
                var body__ = JSON.stringify (parsedBody, null, '  ');
                console.log(body__);
                return callback(null, body__);
                
            })
            .catch(function (err) {
                // GET failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                return callback(err__, null);
        }); 
   },

   /* Object body to get analyze text function */
   body_get_analyze_text: function(language__, analyzerIds__, text__){
    return {
        body: { "language" : language__, 
                "analyzerIds" : analyzerIds__,
                "text" : text__
        }
    }
   },

}



