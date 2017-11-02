require('dotenv').load();

var builder = require('botbuilder');
var restify = require('restify');
var bing_spell_check = require('./bing_spell_check');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
   
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Create your bot with a function to receive messages from the user.
// This default message handler is invoked if the user's utterance doesn't
// match any intents handled by other dialogs.
var bot = new builder.UniversalBot(connector, 
    function (session, args) {
        session.send("Hi... I'm the bing spell check bot sample.");
        

        /*  Test BingSpellCheckAPI bing_spell_check */
        /*
        var documents = {
            'mode': 'proof', 
            "mkt": "en-US", 
            'text': session.message.text 
        };

        bing_spell_check.get_spell_check(documents, function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Bing-Spell-Check-API\n"+err);
            }
        });
        */

    }
);



