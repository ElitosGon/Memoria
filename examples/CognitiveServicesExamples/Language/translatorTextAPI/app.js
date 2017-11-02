require('dotenv').load();

var builder = require('botbuilder');
var restify = require('restify');
var translator_text = require('./translator_text');
var request = require('request');
var parseString = require('xml2js').parseString;

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
        session.send("Hi... I'm the translator text bot sample.");

        session.say("Hola mundo");

        /*
        translator_text.get_language_names_for_translate(function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Translator-Text-API\n"+err);
            }
        });

        translator_text.get_language_names_for_speak(function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Translator-Text-API\n"+err);
            }
        });
         */



        /*

        var parameters = translator_text.parameters_get_language_names('','es');
        var body_object = translator_text.body_get_language_names(["es","zh","en"]);

        translator_text.get_language_names(parameters, body_object.body , function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Translator-Text-API\n"+err);
            }
        });
        
        */



        











        /*  Test Translator text translator_text */
        /*
        var parameters = translator_text.parameters_get_translation('', session.message.text, 'en', 'es', 'text/plain', 'general');
        translator_text.get_translation(parameters, function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Translator-Text-API\n"+err);
            }
        });
        */
        /*
        var body_object = translator_text.body_multi_get_translation('', ["Hello", "World Happy day"], 'en', 'es', 'text/plain', 'general','NoAction','','','');
        translator_text.get_multi_translation(body_object.body, function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Translator-Text-API\n"+err);
            }
        });
        */
        

    }
);

