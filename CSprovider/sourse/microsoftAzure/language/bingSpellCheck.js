/*
The Spell Check API lets you check a text string for spelling and grammar errors. This section provides technical details about the query parameters and headers that you use to request spell checking, and the JSON response objects that contain the results. 
*/
require('dotenv').load();
var rp = require('request-promise');

const accessKey = process.env.BING_SPELL_CHECK_API_KEY;
const uri = process.env.BING_SPELL_CHECK_API_ENDPOINT;
const pathSpellCheck = '/bing/v7.0/spellcheck/';

module.exports = {

    /* Analyze text with bing spell check. */
   spellCheck: function(parameters, callback) {
        
        var options = {
            method: 'POST',
            uri: 'https://' + uri + pathSpellCheck,
            qs: parameters,
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
   },

   /* Get parameters object to get spell check function */
   parametersBreakSentences: function(actionType__, appName__, cc__, clientMachineName__, docId__, mkt__, mode__, preContextText__, postContextText__, sessionId__, setLang__, text__, userId__){
    return {
        actionType: actionType__,
        appName: appName__, 
        cc: cc__,
        clientMachineName: clientMachineName__,
        docId: docId__,
        mkt: mkt__,
        mode: mode__,
        preContextText: preContextText__,
        postContextText: postContextText__,
        sessionId: sessionId__,
        setLang: setLang__,
        text: text__,
        userId: userId__
    }
   },
}

