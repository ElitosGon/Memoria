require('dotenv').load();
var rp = require('request-promise');

// **********************************************
// *** Update or verify the following values. ***
// **********************************************

// Replace the accessKey string value with your valid access key.
var accessKey = process.env.WEB_LANGUAGE_MODEL_API_KEY;

// Replace or verify the region.

// You must use the same region in your REST API call as you used to obtain your access keys.
// For example, if you obtained your access keys from the westus region, replace 
// "westcentralus" in the URI below with "westus".

// NOTE: Free trial access keys are generated in the westcentralus region, so if you are using
// a free trial access key, you should not need to change this region.
var uri = process.env.WEB_LANGUAGE_MODEL_API_ENDPOINT;
var path_br = '';

module.exports = {
   //Insert spaces into a string of words lacking spaces, like a hashtag or part of a URL. Punctuation or exotic characters can prevent a string from being broken, so it’s best to limit input strings to lower-case, alpha-numeric characters.
   get_model_break_into_words: function(model, text, order, nmax ,callback){
        var options = {
            method: 'POST',
            uri: uri+'/breakIntoWords?model='+model+'&text='+text+'&order='+order+'&maxNumOfCandidatesReturned='+nmax,
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
                return callback(null, body__);
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                return callback(err__, null);
        }); 
   },
   //Calculate the conditional probability that a particular word will follow a given sequence of words.
   get_model_calculate_conditional_probability: function(model, text, order, callback){
        var options = {
            method: 'POST',
            uri: uri+'/calculateConditionalProbability?model='+model+'&order='+order,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: text,
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
   //Calculate the joint probability that a particular sequence of words will appear together.
   get_model_calculate_joint_probability: function(model, text, order, callback){
        var options = {
            method: 'POST',
            uri: uri+'/calculateJointProbability?model='+model+'&order='+order,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: text,
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
   // Get the list of words (completions) most likely to follow a given sequence of words.
   get_model_generate_next_words: function(model, text, order, nmax, callback){
        var options = {
            method: 'POST',
            uri: uri+'/generateNextWords?model='+model+'&words='+text+'&order='+order+'&maxNumOfCandidatesReturned='+nmax,
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
                return callback(null, body__);
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                return callback(err__, null);
        }); 
   }
}

