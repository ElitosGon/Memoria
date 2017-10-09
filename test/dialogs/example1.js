var builder = require('botbuilder');
const uuid = require('uuid');
const library = new builder.Library('example1');

library.dialog('/', [
	(session) => {
		builder.Prompts.attachment(session, "Upload a picture for me.");
	},
	(session, results) => {
		session.conversationData.profileImage = results.response;
		builder.Prompts.text(session, 'Hi! What is your ege?');
	},
	(session, results) => {
		session.endDialogWithResult(results);
	}
	]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;
