const Alexa = require('ask-sdk-core');
const { LaunchRequestHandler } = require('./handlers/LaunchRequestHandler');
const { PlayStreamIntentHandler } = require('./handlers/PlayStreamIntentHandler');
const { PlayFromAppIntentHandler, CheckPendingUrlHandler } = require('./handlers/PlayFromAppHandler');
const { HelpIntentHandler, CancelAndStopIntentHandler, SessionEndedRequestHandler } = require('./handlers/ErrorHandlers');
const { 
    PlaybackStartedHandler, 
    PlaybackFinishedHandler, 
    PlaybackStoppedHandler, 
    PlaybackFailedHandler 
} = require('./handlers/AudioPlayerHandlers');
const { ErrorHandler } = require('./handlers/ErrorHandlers');

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayStreamIntentHandler,
        PlayFromAppIntentHandler,
        CheckPendingUrlHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
        PlaybackStartedHandler,
        PlaybackFinishedHandler,
        PlaybackStoppedHandler,
        PlaybackFailedHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();