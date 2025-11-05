const Alexa = require('ask-sdk-core');
const { validateUrl } = require('../utils/urlValidator');

const PlayFromAppIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayFromAppIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Please visit the web page to paste your URL. I\'ve sent a link to your Alexa app. After you paste the URL there, come back and say "play from my app".';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(false)
            .addDirective({
                type: 'Connections.StartConnection',
                uri: 'connection://AMAZON.CreateApp/1',
                input: {
                    '@type': 'CreateAppRequest',
                    'appIdentifier': 'com.customurlplayer.web',
                    'name': 'Custom URL Player',
                    'description': 'Paste your stream URL here',
                    'uri': 'https://travelsignals.org/alexa/'
                }
            })
            .getResponse();
    }
};

const CheckPendingUrlHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CheckPendingUrlIntent';
    },
    async handle(handlerInput) {
        // In a real implementation, you'd check a database or API
        // For now, we'll simulate checking for a pending URL
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const pendingUrl = attributes.pendingUrl;
        
        if (!pendingUrl) {
            const speakOutput = 'No pending URL found. Please add a URL from the web interface first.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Would you like to open the web interface to add a URL?')
                .getResponse();
        }

        const validation = validateUrl(pendingUrl);
        if (!validation.isValid) {
            const speakOutput = `The pending URL is invalid. ${validation.error}`;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Please provide a valid stream URL.')
                .getResponse();
        }

        const normalizedUrl = validation.normalizedUrl;
        
        // Clear the pending URL
        attributes.pendingUrl = null;
        handlerInput.attributesManager.setSessionAttributes(attributes);
        
        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective('REPLACE_ALL', normalizedUrl, normalizedUrl, 0, null, null)
            .speak(`Now playing from your app: ${normalizedUrl}`)
            .getResponse();
    }
};

module.exports = { PlayFromAppIntentHandler, CheckPendingUrlHandler };