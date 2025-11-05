# Alexa Custom URL Player

An Amazon Alexa skill that allows users to play custom HLS and Icecast audio streams by providing a URL. Supports both voice input and mobile/web app integration for easy URL sharing.

## 🎯 Features

- **Voice Control**: Play streams by speaking URLs
- **Mobile Integration**: Copy/paste URLs from mobile apps
- **Format Support**: HLS (.m3u8), Icecast, MP3 streams
- **URL Validation**: Smart validation with error handling
- **AudioPlayer Interface**: Full playback controls
- **Web Interface**: Mobile-friendly URL input page

## 🚀 Quick Start

### Option 1: Alexa-Hosted (Recommended - Free)
1. Go to [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
2. Create new skill → Choose "Alexa-Hosted"
3. Upload files from `lambda/` directory
4. Use `skill-hosted.json` for manifest
5. Deploy with one click

### Option 2: AWS Lambda
```bash
# Configure AWS CLI
aws configure

# Deploy
./deploy-complete.sh
```

## 📱 Usage Examples

### Voice Commands
```
"Alexa, open Custom URL Player"
"Alexa, ask Custom URL Player to play HTTP colon slash slash example dot com slash stream dot M 3 U 8"
"Alexa, ask Custom URL Player to play my radio stream"
```

### Mobile App Integration
```
"Alexa, ask Custom URL Player to play from my app"
"Alexa, ask Custom URL Player to check for pending URL"
```

## 🌐 Mobile/Web Integration

Deploy `web/index.html` to your server (e.g., `https://travelsignals.org/alexa/`):

1. Users visit the web page on mobile
2. Paste their HLS/Icecast URL
3. Click "Send to Alexa"
4. Use voice command to play

## 📁 Project Structure

```
├── lambda/                    # Alexa-Hosted deployment files
│   ├── index.js              # Main skill handler
│   ├── handlers/             # Intent handlers
│   ├── utils/                # Utilities
│   └── package.json
├── web/
│   └── index.html           # Mobile web interface
├── models/
│   └── en-US.json           # Interaction model
├── skill-hosted.json        # Alexa-Hosted manifest
├── skill.json               # AWS Lambda manifest
└── deploy-complete.sh        # Deployment script
```

## 🔧 Configuration

### Alexa-Hosted Skills
- No AWS account required
- Free hosting
- Automatic SSL
- Built-in CI/CD

### AWS Lambda Deployment
- Requires AWS account
- Pay-as-you-go pricing
- Custom domain support

## 🎵 Supported URL Formats

- **HLS streams**: `https://example.com/stream.m3u8`
- **Icecast streams**: `https://radio.example.com/stream`
- **MP3 streams**: `https://example.com/live.mp3`

## 🛠️ Development

### Local Testing
```bash
npm install
# Test locally with ask-cli
ask simulate
```

### Deployment
```bash
# For AWS Lambda
./deploy-complete.sh

# For Alexa-Hosted
# Upload lambda/ folder via Alexa Developer Console
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 🔗 Links

- [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
- [ASK SDK Documentation](https://developer.amazon.com/en-US/docs/alexa/ask-sdk/overview.html)
- [AudioPlayer Interface](https://developer.amazon.com/en-US/docs/alexa/custom-skills/audioplayer-interface-reference.html)

## 📞 Support

- Create an issue for bugs
- Check existing issues before posting
- Provide detailed reproduction steps

---

**Built with ❤️ for the Alexa developer community**