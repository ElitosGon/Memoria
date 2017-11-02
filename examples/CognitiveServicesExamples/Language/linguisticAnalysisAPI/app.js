require('dotenv').load();

var builder = require('botbuilder');
var restify = require('restify');
var linguistic_analysis = require('./linguistic_analysis');
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
        session.send("Hi... I'm the linguistic analysis bot sample.");
        
        /*  Test Linguistic analysis linguistic_analysis */
        /* analyze text */
        var body_object = linguistic_analysis.body_get_analyze_text("en", ["4fa79af1-f22c-408d-98bb-b7d7aeef7f04", "22a6b758-420f-4745-8a3c-46835a67c0d2"], session.message.text);

        linguistic_analysis.get_analyze_text(body_object.body ,function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Linguistic-Analysis-API\n"+err);
            }
        });


        /* list analyzers*/
        
        linguistic_analysis.get_list_analyzers(function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
               session.send("Error Linguistic-Analysis-API\n"+err);
            }
        });
        
        
    }
);

