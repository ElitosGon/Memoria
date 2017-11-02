require('dotenv').load();
var builder = require('botbuilder');
var restify = require('restify');
var detect_language = require('./detect_language');
var analyze_sentiment = require('./analyze_sentiment');
var extract_key_phrases = require('./extract_key_phrases');
var textAnalitycsAPI = require('./textAnalitics');

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
        session.send("Hi... I'm the text analitics bot sample. I can analyze opinions, get the key phrases and detect language.");
        
        /*  Test TestAnalitycsAPI detect_language */
        var parameters = textAnalitycsAPI.parameters_get_language(2);
        var body_object = textAnalitycsAPI.body_get_language();
        body_object.add_item("1", session.message.text);

        textAnalitycsAPI.get_language(parameters, body_object.body, function (err, data) {
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Text-Analitycs-API \n "+ err);
            }
        });

        /*
        var documents = { 'documents': [
            { 'id': '1', 'text': session.message.text }
        ]};

        detect_language.get_language(documents, function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Text-Analitycs-API\n"+err);
            }
        });
        */


        /*  Test TestAnalitycsAPI analyze_sentiment */
        body_object = textAnalitycsAPI.body_get_sentiments();
        body_object.add_item("1", session.message.text, "en");

        textAnalitycsAPI.get_sentiments(body_object.body, function (err, data) {
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Text-Analitycs-API \n "+ err);
            }
        });



        /*  Test TestAnalitycsAPI extract_key_phrases */
        /*
        var documents = { 'documents': [
            { 'id': '1', 'language': 'es', 'text': session.message.text }
        ]};

        extract_key_phrases.get_key_phrases(documents, function(err, data){
            if(data){
                session.send(data);
            }
            if(err){
                session.send("Error Text-Analitycs-API\n"+err);
            }
        });
        */

    }
);



/*
var documents = { 'documents': [
    { 'id': '1', 'language': 'es', 'text': session.message.text }
]};

analyze_sentiment.get_sentiments(documents, function(err, data){
    if(data){
        session.send(data);
        body.push(data);
    }
    if(err){
        session.send("Error Text-Analitycs-API\n"+err);
    }
});
*/