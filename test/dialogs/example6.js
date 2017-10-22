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

// Create bot and default message handler
const bot = new builder.UniversalBot(connector, (session) => {
    session.send("This is a simple bot.");
});

const logUserConversation = (event) => {
    console.log('message: ' + event.text + ', user: ' + event.address.user.name);
   // event.text = "Hello world!";
};

// Middleware for logging (Event log)
bot.use({
    receive: function (event, next) {
        logUserConversation(event);
        next();
    },
    send: function (event, next) {
        logUserConversation(event);
        next();
    }
});