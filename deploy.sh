#!/bin/bash

# Deployment Script for Alexa Custom URL Player
# Run this script to deploy your skill to AWS Lambda

echo "🚀 Deploying Alexa Custom URL Player..."

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI not found. Please install AWS CLI first:"
    echo "   https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html"
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
zip -r custom-url-player.zip index.js handlers/ utils/ package.json node_modules/

# Create Lambda function
echo "⚡ Creating Lambda function..."
aws lambda create-function \
  --function-name CustomUrlPlayer \
  --runtime nodejs18.x \
  --role arn:aws:iam::804033740156:role/lambda-execution-role \
  --handler index.handler \
  --zip-file fileb://custom-url-player.zip \
  --region us-east-1 \
  --description "Alexa skill for playing custom HLS and Icecast URLs" \
  --timeout 30 \
  --memory-size 256

# Add necessary permissions for Alexa
echo "🔐 Adding Alexa permissions..."
aws lambda add-permission \
  --function-name CustomUrlPlayer \
  --statement-id alexa-access \
  --action lambda:InvokeFunction \
  --principal alexa-connected.amazon.com \
  --region us-east-1

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to Alexa Developer Console: https://developer.amazon.com/alexa/console/ask"
echo "2. Create new skill or update existing one"
echo "3. Upload skill.json and models/en-US.json"
echo "4. Set endpoint to: arn:aws:lambda:us-east-1:804033740156:function:CustomUrlPlayer"
echo "5. Deploy web interface to: https://travelsignals.org/alexa/"
echo ""
echo "🧪 Test commands:"
echo "- 'Alexa, open Custom URL Player'"
echo "- 'Alexa, ask Custom URL Player to play from my app'"