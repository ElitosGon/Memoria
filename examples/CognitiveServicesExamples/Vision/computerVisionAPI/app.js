require('dotenv').load();

var builder = require('botbuilder');
var restify = require('restify');
var computer_vision = require('./computer_vision');
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
        session.send("Hi... I'm the computer vision bot sample.");
        
        /*  Test computer vision computer_vision */
        /* analyze image */
        
        // Request parameters.
        var params = {
            visualFeatures: "Categories,Tags,Description,Faces,ImageType,Color,Adult",
            details: "",
            language: "en",
        };
        
        computer_vision.get_analyze_image(params, session.message.text ,function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Computer-Vision-API\n"+err);
            }
        });

        /* get thumbnail */
        // Request parameters.
        var params = {
            // Request parameters
            width: "200",
            height: "200",
            smartCropping: "true",
        };
        
        computer_vision.get_thumbnail(params, session.message.text ,function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Computer-Vision-API\n"+err);
            }
        });
        

        
        
    }
);

