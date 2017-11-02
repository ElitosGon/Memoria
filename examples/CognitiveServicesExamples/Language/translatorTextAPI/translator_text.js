/*
Microsoft Translator APIs can be seamlessly integrated into your applications, websites, tools, or other solutions to provide multi-language user experiences. Leveraging industry standards, it can be used on any hardware platform and with any operating system to perform language translation and other language-related operations such as text language detection or text to speech. Click Here for more informaiton about the Microsoft Translator API.
*/
require('dotenv').load();
var rp = require('request-promise');
var parseString = require('xml2js').parseString;

const uri = process.env.TRANSLATOR_TEXT_API_ENDPOINT;
const accessKey = process.env.TRANSLATOR_TEXT_API_KEY;
const path_get_translation = 'https://api.microsofttranslator.com/V2/Http.svc/Translate';
const path_get_multi_translation = 'https://api.microsofttranslator.com/V2/Http.svc/TranslateArray';
const path_get_language_names = 'https://api.microsofttranslator.com/V2/Http.svc/GetLanguageNames';
const path_get_language_names_for_translate = 'https://api.microsofttranslator.com/V2/Http.svc/GetLanguagesForTranslate';
const path_get_detect = 'https://api.microsofttranslator.com/V2/Http.svc/Detect';
const path_get_multi_detect = 'https://api.microsofttranslator.com/V2/Http.svc/DetectArray';
const path_get_break_sentences = 'https://api.microsofttranslator.com/V2/Http.svc/BreakSentences';

module.exports = {
    
    /* Translates a text string from one language to another. */
    get_translation: function(parameters, callback) {
        
        var options = {
            method: 'GET',
            uri: path_get_translation,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            }
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body__ = JSON.stringify(result, null, '  ');
                    //console.dir(body__);
                    return callback(null, body__);
                });
            })
            .catch(function (err) {
                // GET failed...
                var err__ = JSON.stringify (err, null, '  ');
                //console.log(err__);
                return callback(err__, null);
        }); 
   },

   /* Use the TranslateArray method to retrieve translations for multiple source texts. */
   get_multi_translation: function(body, callback){
        
        var options = {
            method: 'POST',
            uri: path_get_multi_translation,
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
                    var body__ = JSON.stringify(result, null, '  ');
                    //console.dir(body__);
                    return callback(null, body__);
                });
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                return callback(err__, null);
        }); 
   },

   /* Retrieves friendly names for the languages passed in as the parameter languageCodes, and localized using the passed locale language. */
   get_language_names: function(parameters, body, callback){

       var options = {
            method: 'POST',
            uri: path_get_language_names,
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
                    var body__ = JSON.stringify(result, null, '  ');
                    //console.dir(body__);
                    return callback(null, body__);
                });
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                return callback(err__, null);
        }); 
   },

   /* Obtain a list of language codes representing languages that are supported by the Translation Service. Translate and TranslateArray can translate between any two of these languages. */
   get_language_names_for_translate: function(callback){

       var options = {
            method: 'GET',
            uri: path_get_language_names_for_translate,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body__ = JSON.stringify(result, null, '  ');
                    //console.dir(body__);
                    return callback(null, body__);
                });
                
            })
            .catch(function (err) {
                // GET failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                return callback(err__, null);
        }); 
   },

   /* Use the Detect method to identify the language of a selected piece of text. */
   get_detect: function(parameters, callback){

       var options = {
            method: 'GET',
            uri: path_get_detect,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body__ = JSON.stringify(result, null, '  ');
                    //console.dir(body__);
                    return callback(null, body__);
                });
                
            })
            .catch(function (err) {
                // GET failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                return callback(err__, null);
        }); 
   },

   /*Use the DetectArray method to identify the language of an array of string at once. Performs independent detection of each individual array element and returns a result for each row of the array.*/
   get_multi_detect: function(parameters, body, callback){

       var options = {
            method: 'POST',
            uri: path_get_multi_detect,
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
                    var body__ = JSON.stringify(result, null, '  ');
                    //console.dir(body__);
                    return callback(null, body__);
                });
                
            })
            .catch(function (err) {
                // POST failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                return callback(err__, null);
        }); 
   },

   /* Breaks a piece of text into sentences and returns an array containing the lengths in each sentence. */
   get_break_sentences: function(parameters, callback){

       var options = {
            method: 'GET',
            uri: path_get_break_sentences,
            qs: parameters,
            headers: {
                'Ocp-Apim-Subscription-Key': accessKey,
            },
        }

        rp(options)
            .then(function (parsedBody) {
                // GET succeeded...               
                parseString(parsedBody, function (err, result) {
                    var body__ = JSON.stringify(result, null, '  ');
                    //console.dir(body__);
                    return callback(null, body__);
                });
                
            })
            .catch(function (err) {
                // GET failed...
                var err__ = JSON.stringify (err, null, '  ');
                console.log(err__);
                return callback(err__, null);
        }); 
   },

   /* Get parameters object to get break sentences function */
   parameters_get_break_sentences: function(appid__, text__, language__){
    return {
        appid: appid__,
        text: text__,
        language: language__
    }
   },

   /* Get parameters object to get detect function */
   parameters_get_detect: function(appid__, text__){
    return {
        appid: appid__,
        text: text__
    }
   },

   /* Get parameters object to get multi detect function */
   parameters_get_multi_detect: function(appid__){
    return {
        appid: appid__,
    }
   },

   /* Get parameters object to get translation function */
   parameters_get_translation: function(appid__, text__, from__, to__, contentType__, category__){
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
   body_get_multi_translation: function(appid__, texts__, from__, to__, contentType__, category__, profanityAction__, state__, uri__, user__){
    return {
        body: {
            "AppId": appid__,
            "Texts": texts__,
            "From": from__,
            "To": to__,
            "Option": {
                "ContentType__": contentType__,
                "Category__": category__,
                "ProfanityAction": profanityAction__,
                "State": state__,
                "Uri": uri__,
                "User": user__
            }
        }
    }
   },

   /* Get parametes to get language names function */
   parameters_get_language_names: function(appid__, locale__){
    return {
        "appId": appid__,
        "locale": locale__
        
    }
   },

   /* Object to get language names function */
   body_get_language_names: function(locale__){
    return {
        body: locale__, /*Array []*/
        add_locale: function(locale__){
            this.body.push(locale__);
        }
    }
   },

   /* Object to get multi detect function */
   body_get_language_names: function(texts__){
    return {
        body: texts__, /*Array []*/
        add_text: function(text__){
            this.body.push(text__);
        }
    }
   }

}