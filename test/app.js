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

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, [
	function(session){
		session.beginDialog('ensureProfile', session.userData.profile);
	},
	function (session, results, next) {
        session.userData.profile = results.response; // Save user profile.
        session.send(`Hello ${session.userData.profile.name}! I love ${session.userData.profile.company}!`);
    	next();
    },
    function(session){
    	session.beginDialog('example1:/');
    },
    function(session, results){
        session.beginDialog('example2:PartA', results);
    },
    function(session, results){
        if(results.response){
            session.dialogData.room = results.response;
            var reply = new builder.Message().text("Here you go:")
                            .attachments([{
                                contentType: "image/jpeg",
                                contentUrl: "http://www.theoldrobots.com/images62/Bender-18.JPG"
                            }]);

            session.send(reply);
            var msg = `Thank you. Your reservation will be delivered to room #${session.dialogData.room} - state: ${session.conversationData.isHotel}`;
            session.endConversation(msg);
        }
    }


]).endConversationAction(
    "endOrderDinner", "Ok. Goodbye.",
    {
        matches: /^cancel$|^goodbye$/i,
        confirmPrompt: "This will cancel your reservation. Are you sure?"
    }
);


// Waterfall example 3.
bot.dialog('ensureProfile', [
    function (session, args, next) {
        session.dialogData.profile = args || {}; // Set the profile or create the object.
        if (!session.dialogData.profile.name) {
            builder.Prompts.text(session, "What's your name?");
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results, next) {
        if (results.response) {
            // Save user's name if we asked for it.
            session.dialogData.profile.name = results.response;
        }
        if (!session.dialogData.profile.company) {
            builder.Prompts.text(session, "What company do you work for?");
        } else {
            next(); // Skip if we already have this info.
        }
    },
    function (session, results) {
        if (results.response) {
            // Save company name if we asked for it.
            session.dialogData.profile.company = results.response;
        }
        session.endDialogWithResult({ response: session.dialogData.profile });
    }
]);

//Sub dialogs
bot.library(require('./dialogs/example1'));
bot.library(require('./dialogs/example2'));