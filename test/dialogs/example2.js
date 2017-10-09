var builder = require('botbuilder');
const uuid = require('uuid');
const library = new builder.Library('example2');

library.dialog('PartA', [
    (session, results) => {
        session.send(`You age is ${results.response}!`);
        session.send("Welcome to the dinner reservation.");
        builder.Prompts.time(session, "Please provide a reservation date and time (e.g.: June 6th at 5pm)");
    },
    (session, results) => {
        session.dialogData.reservationDate = builder.EntityRecognizer.resolveTime([results.response]);
        builder.Prompts.number(session, "How many people are in your party?");
    },
    (session, results) => {
        session.dialogData.partySize = results.response;
        builder.Prompts.text(session, "Who's name will this reservation be under?");
    },
    (session, results) => {
        session.dialogData.reservationName = results.response;
        builder.Prompts.choice(session, "Are you in the hotel ?", "Yes|No", { listStyle: builder.ListStyle.button });
        /* listStyle: options
        0   none    No list is rendered. This is used when the list is included as part of the prompt.
        1   inline  Choices are rendered as an inline list of the form "1. red, 2. green, or 3. blue".
        2   list    Choices are rendered as a numbered list.
        3   button  Choices are rendered as buttons for channels that support buttons. For other channels they will be rendered as text.
        4   auto    The style is selected automatically based on the channel and number of options.
        */
    },
    (session, results) => {
        session.conversationData.isHotel = results.response.entity;
        // Process request and display reservation details
        session.send(`Reservation confirmed. Reservation details: <br/>Date/Time: ${session.dialogData.reservationDate} <br/>Party size: ${session.dialogData.partySize} <br/>Reservation name: ${session.dialogData.reservationName}`);
        builder.Prompts.text(session, "Room number?");
        
    },
    (session, results) => {
        session.endDialogWithResult(results);
    }
    ]).cancelAction('cancel', null, { matches: /^cancel/i });

module.exports = library;

