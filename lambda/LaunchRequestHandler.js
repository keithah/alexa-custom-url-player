const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to Custom URL Player! You can ask me to play any HLS or Icecast stream. Just say "play" followed by the URL. For example, "play HTTP colon slash slash example dot com slash stream dot M 3 U 8". What would you like to play?';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = { LaunchRequestHandler };