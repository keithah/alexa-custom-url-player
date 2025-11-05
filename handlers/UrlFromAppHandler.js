const Alexa = require('ask-sdk-core');
const { validateUrl } = require('../utils/urlValidator');

const GetUrlFromAppHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetUrlFromAppIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'I\'ll open a web page where you can paste your URL. After you paste it, come back here and I\'ll play your stream.';
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addDirective({
                type: 'Connections.StartConnection',
                uri: 'connection://AMAZON.AskForPermissions/Consent',
                input: {
                    '@type': 'AskForPermissionsConsentRequest',
                    'permissionScopes': [
                        {
                            'permissionScope': 'alexa::devices:all:address:country_and_postal_code'
                        }
                    ],
                    '@context': 'https://schema.org'
                }
            })
            .getResponse();
    }
};

const PlayUrlFromAppHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Connections.Response'
            && handlerInput.requestEnvelope.request.name === 'AskFor';
    },
    handle(handlerInput) {
        const url = handlerInput.requestEnvelope.request.payload.url;
        
        if (!url) {
            const speakOutput = 'No URL was provided. Please try again.';
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Please provide a URL to play.')
                .getResponse();
        }

        const validation = validateUrl(url);
        if (!validation.isValid) {
            const speakOutput = `That doesn't appear to be a valid HLS or Icecast URL. ${validation.error}`;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .reprompt('Please provide a valid stream URL.')
                .getResponse();
        }

        const normalizedUrl = validation.normalizedUrl;
        
        return handlerInput.responseBuilder
            .addAudioPlayerPlayDirective('REPLACE_ALL', normalizedUrl, normalizedUrl, 0, null, null)
            .speak(`Now playing from your app: ${normalizedUrl}`)
            .getResponse();
    }
};

module.exports = { GetUrlFromAppHandler, PlayUrlFromAppHandler };