require('dotenv').load();

var builder = require('botbuilder');
var restify = require('restify');
var web_language_model = require('./web_language_model');
var request = require('request');

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
        session.send("Hi... I'm the web language model bot sample.");
        
        /*  Test Web Language Model web_language_model */
        /* break_into_words */
        var parameters = web_language_model.parametersBreakInToWords('query', session.message.text, '', '');

        web_language_model.breakInToWords(parameters ,function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Web-Language-Model-API\n"+err);
            }
        });


        /* calculate_conditional_probability */
        /*
        var text = {
        "queries":
            [
                {
                    "words": "El arca de",
                    "word": session.message.text
                },
                {
                    "words": "El libro de",
                    "word": session.message.text
                },
                {
                    "words": "El mundo sin",
                    "word": session.message.text
                }
            ]
        };

        web_language_model.get_model_calculate_conditional_probability('query', text, '',function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Web-Language-Model-API\n"+err);
            }
        });
        */

        /*calculate_joint_probability*/
        /*
        var text = {
        "queries":
            [
                session.message.text,
                "Good",
                "Jesus"
            ]
        };

        web_language_model.get_model_calculate_joint_probability('query', text, '',function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Web-Language-Model-API\n"+err);
            }
        });
        */

        /* generate_next_words */
        /*
        web_language_model.get_model_generate_next_words('query', session.message.text, '', '',function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Web-Language-Model-API\n"+err);
            }
        });
        */
        
    }
);

