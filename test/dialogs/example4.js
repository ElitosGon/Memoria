var builder = require('botbuilder');
var restify = require('restify');

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

var bot = new builder.UniversalBot(connector, 
    function (session) {
        session.beginDialog('adhocDialog');
    }
);

bot.dialog('adhocDialog', function(session, args) {
    var savedAddress = session.message.address;

    // (Save this information somewhere that it can be accessed later, such as in a database, or session.userData)
    session.userData.savedAddress = savedAddress;

    var message = 'Hello user, good to meet you! I now know your address and can send you notifications in the future.';
    
    session.send(message);
    sendProactiveMessage(session.userData.savedAddress);

});


function sendProactiveMessage(address) {
    var msg = new builder.Message().address(address);
    msg.text('Hello, this is a notification');
    msg.textLocale('en-US');
    bot.send(msg);
}
