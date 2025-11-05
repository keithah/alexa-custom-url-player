const Alexa = require('ask-sdk-core');

const PlaybackStartedHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackStarted';
    },
    handle(handlerInput) {
        console.log('Playback started');
        return handlerInput.responseBuilder.getResponse();
    }
};

const PlaybackFinishedHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackFinished';
    },
    handle(handlerInput) {
        console.log('Playback finished');
        return handlerInput.responseBuilder.getResponse();
    }
};

const PlaybackStoppedHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackStopped';
    },
    handle(handlerInput) {
        console.log('Playback stopped');
        return handlerInput.responseBuilder.getResponse();
    }
};

const PlaybackFailedHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'AudioPlayer.PlaybackFailed';
    },
    handle(handlerInput) {
        console.log('Playback Failed');
        const error = handlerInput.requestEnvelope.request.error;
        console.log(`Error: ${error.message}`);
        
        const speakOutput = 'Sorry, I had trouble playing that stream. Please check the URL and try again.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

module.exports = {
    PlaybackStartedHandler,
    PlaybackFinishedHandler,
    PlaybackStoppedHandler,
    PlaybackFailedHandler
};