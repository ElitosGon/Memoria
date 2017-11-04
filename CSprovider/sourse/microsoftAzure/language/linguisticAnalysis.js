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
const pathAnalyzeText = '/analyze';
const pathGetListAnalyzers = '/analyzers';

module.exports = {

   /* Analyze text with specific analyzers. */
   analyzeText: function(body, callback){
        
        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathAnalyzeText,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* This API returns a list of strings representing which analyzers are currently registered. */
   listAnalyzers: function(callback){
        
        var options = {
            method: 'GET',
            uri: 'https://' + uri + pathGetListAnalyzers,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
        };

        var res = rp(options)
            .then(function (parsedBody) {
                // GET succeeded...
                var body_ = JSON.stringify (parsedBody, null, '  ');
                console.log(body_);
                return callback(null, body_);
                
            })
            .catch(function (err) {
                // GET failed...
                var err_ = JSON.stringify (err, null, '  ');
                console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Object body to get analyze text function */
   bodyAnalyzeText: function(language__, analyzerIds__, text__){
    return {
        "language" : language__, 
        "analyzerIds" : analyzerIds__,
        "text" : text__
    }
   },

}



