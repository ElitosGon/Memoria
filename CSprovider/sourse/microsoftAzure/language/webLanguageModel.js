/*
Microsoft Web Language Model API, a REST-based cloud service providing state-of-the-art tools for natural language processing. Using this API, your application can leverage the power of big data through language models trained on web-scale corpora collected by Bing in the EN-US market. 
*/
require('dotenv').load();
var rp = require('request-promise');


const accessKey = process.env.WEB_LANGUAGE_MODEL_API_KEY;
const uri = process.env.WEB_LANGUAGE_MODEL_API_ENDPOINT;
const pathBreakInToWords = '/breakIntoWords';
const pathCalculateConditionalProbability = '/calculateConditionalProbability';
const pathCalculateJointProbability = '/calculateJointProbability';
const pathGenerateNextWords = '/generateNextWords';
const pathListAvailableModels = '/models';

module.exports = {

   //Insert spaces into a string of words lacking spaces, like a hashtag or part of a URL. Punctuation or exotic characters can prevent a string from being broken, so it’s best to limit input strings to lower-case, alpha-numeric characters.
   breakInToWords: function(parameters ,callback){
        
        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathBreakInToWords,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            }
        };

        var res = rp(options)
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

    /* Get parameters object to get break in to words function */
   parametersBreakInToWords: function(model__, text__, order__, maxNumOfCandidatesReturned__){
    return {
        model: model__,
        text: text__,
        order: order__,
        maxNumOfCandidatesReturned: maxNumOfCandidatesReturned__
    }
   },

   //Calculate the conditional probability that a particular word will follow a given sequence of words.
   calculateConditionalProbability: function(parameters, body, callback){
        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathCalculateConditionalProbability,
            qs: parameters,
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

    /* Get parameters object to get calculate conditional probability function */
   parametersCalculateConditionalProbability: function(model__, order__){
    return {
        model: model__,
        order: order__
    }
   },

   /* Object to get calculate conditional probability function */
   bodyCalculateConditionalProbability: function(){
    return {
        body: { "queries": [] },
        add_query: function(words__, word__){
            this.body.queries.push({"words": words__, "word": word__});
        }
    }
   },

   //Calculate the joint probability that a particular sequence of words will appear together.
   calculateJointProbability: function(parameters, body, callback){
        
        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathCalculateJointProbability,
            qs: parameters,
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

   /* Get parameters object to get calculate joint probability function */
   parametersCalculateJointProbability: function(model__, order__){
    return {
        model: model__,
        order: order__
    }
   },

   /* Object to get calculate joint probability function */
   bodyCalculateJointProbability: function(){
    return {
        body: { "queries": [] },
        add_word: function(word__){
            this.body.queries.push(word__);
        }
    }
   },

   // Get the list of words (completions) most likely to follow a given sequence of words.
   generateNextWords: function(parameters, callback){

        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathGenerateNextWords,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            json: true
        };

        var res = rp(options)
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

    /* Get parameters object to generate next words function */
   parametersGenerateNextWords: function(model__, words__, order__, maxNumOfCandidatesReturned__){
    return {
        model: model__,
        words: words__,
        order: order__,
        maxNumOfCandidatesReturned: maxNumOfCandidatesReturned__
    }
   },

   /* List models available currently. */
   listAvailableModels: function(callback){

        var options = {
            method: 'GET',
            uri: 'https://' + uri + pathListAvailableModels,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            json: true
        };

        var res = rp(options)
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

}

