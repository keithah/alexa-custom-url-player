const Alexa = require('ask-sdk-core');
const { validateUrl } = require('../utils/urlValidator');

const PlayStreamIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayStreamIntent';
    },
    handle(handlerInput) {
        const url = Alexa.getSlotValue(handlerInput.requestEnvelope, 'url');
        
        if (!url) {
            const speakOutput = 'I need a URL to play. Please provide a valid HLS or Icecast stream URL.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Please tell me the URL you want to play.')
                .getResponse();
        }

        const validation = validateUrl(url);
        if (!validation.isValid) {
            const speakOutput = `Sorry, that doesn't appear to be a valid HLS or Icecast URL. ${validation.error}`;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Please provide a valid HLS or Icecast stream URL.')
                .getResponse();
        }

        const normalizedUrl = validation.normalizedUrl;
        
        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective('REPLACE_ALL', normalizedUrl, normalizedUrl, 0, null, null)
            .speak(`Now playing ${normalizedUrl}`)
            .getResponse();
    }
};

module.exports = { PlayStreamIntentHandler };