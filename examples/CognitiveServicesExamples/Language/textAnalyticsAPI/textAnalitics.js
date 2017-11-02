/*
The Text Analytics API is a suite of text analytics web services built with best-in-class Microsoft machine learning algorithms. The API can be used to analyze unstructured text for tasks such as sentiment analysis, key phrase extraction and language detection. No training data is needed to use this API; just bring your text data. This API uses advanced natural language processing techniques to deliver best in class predictions.
*/
require('dotenv').load();
var rp = require('request-promise');

const accessKey = process.env.TEXT_ANALITYCS_API_KEY;
const uri = process.env.TEXT_ANALITYCS_API_ENDPOINT;
const path_get_sentiments = '/text/analytics/v2.0/sentiment';
const path_get_language = '/text/analytics/v2.0/languages';
const path_get_key_phrases = '/text/analytics/v2.0/keyPhrases';

module.exports = {

    /* The API returns a numeric score between 0 and 1. Scores close to 1 indicate positive sentiment, while scores close to 0 indicate negative sentiment. Sentiment score is generated using classification techniques. The input features to the classifier include n-grams, features generated from part-of-speech tags, and word embeddings. */
    get_sentiments: function(body, callback) {  
        
        var options = {
            method: 'POST',
            uri: 'https://' + uri + path_get_sentiments,
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
                var body__ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body__);
                callback(null, body__);
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                callback(err__, null);
        });
    },

    /* The API returns the detected language and a numeric score between 0 and 1. Scores close to 1 indicate 100% certainty that the identified language is true. A total of 120 languages are supported. */
    get_language: function(parameters, body, callback) {

        var options = {
            method: 'POST',
            uri: 'https://' + uri + path_get_language,
            qs: parameters,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true // Automatically stringifies the body to JSON
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body__ = JSON.stringify (parsedBody, null, '  ');
                //console.log(body__);
                callback(null, body__);
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                callback(err__, null);
        });
    },

    /* The API returns a list of strings denoting the key talking points in the input text. We employ techniques from Microsoft Office's sophisticated Natural Language Processing toolkit. */
    get_key_phrases: function(body, callback) {
        
        var options = {
            method: 'POST',
            uri: 'https://' + uri + path_get_language,
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true // Automatically stringifies the body to JSON
        };

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...
                var body__ = JSON.stringify (parsedBody, null, '  ');
                // console.log(body__);
                callback(null, body__);
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                // console.log(err__);
                callback(err__, null);
        });
   },

   /* Get parameters object to get language function */
   parameters_get_language: function(numberOfLanguagesToDetect__){
    return {
        numberOfLanguagesToDetect: numberOfLanguagesToDetect__
    }
   },

   /* Object body to get language function */
   body_get_language: function(){
    return {
        body: {"documents": []},
        add_document: function(id__, text__){
            this.body.documents.push({"id": id__,"text": text__});
        }
    }
   },

   /* Object body to get sentiment function */
   body_get_sentiments: function(){
    return {
        body: {"documents": []},
        add_document: function(id__, text__, language__){
            this.body.documents.push({"language": language__,"id": id__,"text": text__});
        }
    }
   },

    /* Object body to get key phrases function */
   body_get_key_phrases: function(){
    return {
        body: {"documents": []},
        add_document: function(id__, text__, language__){
            this.body.documents.push({"language": language__,"id": id__,"text": text__});
        }
    }
   }

}
