#!/bin/bash

# Complete Deployment Script for Alexa Custom URL Player
# This script sets up everything needed for deployment

echo "🚀 Setting up Alexa Custom URL Player deployment..."

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI not configured. Please run: aws configure"
    echo "   You'll need your AWS Access Key ID, Secret Access Key, and region"
    exit 1
fi

echo "✅ AWS CLI configured"

# Create IAM role for Lambda
echo "🔐 Creating IAM role..."
aws iam create-role \
  --role-name lambda-execution-role \
  --assume-role-policy-document file://trust-policy.json \
  --description "Role for Alexa Custom URL Player Lambda function" || echo "Role may already exist"

# Attach policy to role
echo "📋 Attaching policies..."
aws iam put-role-policy \
  --role-name lambda-execution-role \
  --policy-name lambda-logs-policy \
  --policy-document file://lambda-policy.json

# Wait for role to be ready
echo "⏳ Waiting for role to be ready..."
sleep 10

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
  --memory-size 256 || echo "Function may already exist"

# Update function if it exists
if aws lambda get-function --function-name CustomUrlPlayer --region us-east-1 &> /dev/null; then
    echo "🔄 Updating existing Lambda function..."
    aws lambda update-function-code \
      --function-name CustomUrlPlayer \
      --zip-file fileb://custom-url-player.zip \
      --region us-east-1
fi

# Add necessary permissions for Alexa
echo "🔐 Adding Alexa permissions..."
aws lambda add-permission \
  --function-name CustomUrlPlayer \
  --statement-id alexa-access \
  --action lambda:InvokeFunction \
  --principal alexa-connected.amazon.com \
  --region us-east-1 || echo "Permission may already exist"

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy web interface to: https://travelsignals.org/alexa/"
echo "2. Go to Alexa Developer Console: https://developer.amazon.com/alexa/console/ask"
echo "3. Create new skill or update existing one"
echo "4. Upload skill.json and models/en-US.json"
echo "5. Set endpoint to: arn:aws:lambda:us-east-1:804033740156:function:CustomUrlPlayer"
echo ""
echo "🧪 Test commands:"
echo "- 'Alexa, open Custom URL Player'"
echo "- 'Alexa, ask Custom URL Player to play from my app'"
echo ""
echo "🌐 Web interface will be available at: https://travelsignals.org/alexa/"