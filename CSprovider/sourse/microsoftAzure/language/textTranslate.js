/*
Microsoft Translator APIs can be seamlessly integrated into your applications, websites, tools, or other solutions to provide multi-language user experiences. Leveraging industry standards, it can be used on any hardware platform and with any operating system to perform language translation and other language-related operations such as text language detection or text to speech. Click Here for more informaiton about the Microsoft Translator API.
*/
require('dotenv').load();
var rp = require('request-promise');
var parseString = require('xml2js').parseString;

const uri = process.env.TRANSLATOR_TEXT_API_ENDPOINT;
const accessKey = process.env.TRANSLATOR_TEXT_API_KEY;
const pathTranslation = 'https://api.microsofttranslator.com/V2/Http.svc/Translate';
const pathMultiTranslation = 'https://api.microsofttranslator.com/V2/Http.svc/TranslateArray';
const pathLanguageNames = 'https://api.microsofttranslator.com/V2/Http.svc/GetLanguageNames';
const pathLanguageNamesForTranslate = 'https://api.microsofttranslator.com/V2/Http.svc/GetLanguagesForTranslate';
const pathDetect = 'https://api.microsofttranslator.com/V2/Http.svc/Detect';
const pathMultiDetect = 'https://api.microsofttranslator.com/V2/Http.svc/DetectArray';
const pathBreakSentences = 'https://api.microsofttranslator.com/V2/Http.svc/BreakSentences';

/* Future
* const pathLanguagesForSpeak
* const pathSpeak
* const pathAddTranslation
* const pathAddTranslationArray
* */

module.exports = {
    
    /* Translates a text string from one language to another. */
    translation: function(parameters, callback) {
        
        var options = {
            method: 'GET',
            uri: pathTranslation,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            }
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body_ = JSON.stringify(result, null, '  ');
                    //console.dir(body_);
                    return callback(null, body_);
                });
            })
            .catch(function (err) {
                // GET failed...
                var err_ = JSON.stringify (err, null, '  ');
                //console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Use the TranslateArray method to retrieve translations for multiple source texts. */
   multiTranslation: function(body, callback){
        
        var options = {
            method: 'POST',
            uri: pathMultiTranslation,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
        }

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body_ = JSON.stringify(result, null, '  ');
                    //console.dir(body_);
                    return callback(null, body_);
                });
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Retrieves friendly names for the languages passed in as the parameter languageCodes, and localized using the passed locale language. */
   languageNames: function(parameters, body, callback){

       var options = {
            method: 'POST',
            uri: pathLanguageNames,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
        }

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body_ = JSON.stringify(result, null, '  ');
                    //console.dir(body_);
                    return callback(null, body_);
                });
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Obtain a list of language codes representing languages that are supported by the Translation Service. Translate and TranslateArray can translate between any two of these languages. */
   languageNamesForTranslate: function(callback){

       var options = {
            method: 'GET',
            uri: pathLanguageNamesForTranslate,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body_ = JSON.stringify(result, null, '  ');
                    //console.dir(body_);
                    return callback(null, body_);
                });
                
            })
            .catch(function (err) {
                // GET failed...
                var err_ = JSON.stringify (err, null, '  ');
                console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Use the Detect method to identify the language of a selected piece of text. */
   detect: function(parameters, callback){

       var options = {
            method: 'GET',
            uri: pathDetect,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body_ = JSON.stringify(result, null, '  ');
                    //console.dir(body_);
                    return callback(null, body_);
                });
                
            })
            .catch(function (err) {
                // GET failed...
                var err_ = JSON.stringify (err, null, '  ');
                console.log(err_);
                return callback(err_, null);
        }); 
   },

   /*Use the DetectArray method to identify the language of an array of string at once. Performs independent detection of each individual array element and returns a result for each row of the array.*/
   multiDetect: function(parameters, body, callback){

       var options = {
            method: 'POST',
            uri: pathMultiDetect,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
            body: body,
            json: true
        }

        rp(options)
            .then(function (parsedBody) {
                // POST succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body_ = JSON.stringify(result, null, '  ');
                    //console.dir(body_);
                    return callback(null, body_);
                });
                
            })
            .catch(function (err) {
                // POST failed...
                var err_ = JSON.stringify (err, null, '  ');
                console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Breaks a piece of text into sentences and returns an array containing the lengths in each sentence. */
   breakSentences: function(parameters, callback){

       var options = {
            method: 'GET',
            uri: pathBreakSentences,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body_ = JSON.stringify(result, null, '  ');
                    //console.dir(body_);
                    return callback(null, body_);
                });
                
            })
            .catch(function (err) {
                // GET failed...
                var err_ = JSON.stringify (err, null, '  ');
                console.log(err_);
                return callback(err_, null);
        }); 
   },

   /* Get parameters object to get break sentences function */
   parametersBreakSentences: function(appid__, text__, language__){
    return {
        appid: appid__,
        text: text__,
        language: language__
    }
   },

   /* Get parameters object to get detect function */
   parametersDetect: function(appid__, text__){
    return {
        appid: appid__,
        text: text__
    }
   },

   /* Get parameters object to get multi detect function */
   parametersMultiDetect: function(appid__){
    return {
        appid: appid__,
    }
   },

   /* Get parameters object to get translation function */
   parametersTranslation: function(appid__, text__, from__, to__, contentType__, category__){
    return {
        appid: appid__,
        text: text__,
        from: from__,
        to: to__,
        contentType: contentType__,
        category: category__
    
    }
   },

   /* Object to get multi translation function */
   bodyMultiTranslation: function(appid__, texts__, from__, to__, contentType__, category__, profanityAction__, state__, uri__, user__){
    return {
        body: {
            "AppId": appid__,
            "Texts": texts__,
            "From": from__,
            "To": to__,
            "Option": {
                "ContentType": contentType__,
                "Category": category__,
                "ProfanityAction": profanityAction__,
                "State": state__,
                "Uri": uri__,
                "User": user__
            }
        }
    }
   },

   /* Get parametes to get language names function */
   parametersLanguageNames: function(appid__, locale__){
    return {
        "appId": appid__,
        "locale": locale__

    }
   },

   /* Object to get language names function */
   bodyLanguageNames: function(locale__){
    return {
        body: locale__, /*Array []*/
        add_locale: function(locale__){
            this.body.push(locale__);
        }
    }
   },

   /* Object to get multi detect function */
   bodyMultiLanguageNames: function(texts__){
    return {
        body: texts__, /*Array []*/
        add_text: function(text__){
            this.body.push(text__);
        }
    }
   }

}