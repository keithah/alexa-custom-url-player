# Alexa-Hosted Deployment Guide

## 🚀 Deploy with Alexa-Hosted Skills (Easiest Method)

Alexa-Hosted Skills provides **free hosting** for your skill - no AWS account needed!

### **Step 1: Go to Alexa Developer Console**
Visit: https://developer.amazon.com/alexa/console/ask

### **Step 2: Create New Skill**
1. Click "Create Skill"
2. Skill name: "Custom URL Player"
3. Choose: **"Alexa-Hosted"** (Python or Node.js)
4. Click "Create skill"

### **Step 3: Replace Default Code**
1. In the console, go to "Code" tab
2. Delete all default files
3. Upload these files:
   - `lambda/index.js`
   - `lambda/package.json`
   - `lambda/handlers/` (entire folder)
   - `lambda/utils/` (entire folder)

### **Step 4: Upload Skill Configuration**
1. Go to "Skill Manifest" tab
2. Replace with content from `skill-hosted.json`
3. Go to "Interaction Model" → "JSON Editor"
4. Replace with content from `models/en-US.json`

### **Step 5: Deploy**
1. Click **"Deploy"** button
2. Wait for deployment to complete
3. Test in the "Test" tab

### **Step 6: Deploy Web Interface**
Upload `web/index.html` to: `https://travelsignals.org/alexa/`

## ✅ Benefits of Alexa-Hosted:
- **Free hosting** (no AWS costs)
- **No AWS account needed**
- **Automatic SSL certificates**
- **Built-in CI/CD**
- **Easy updates**

## 🧪 Test Commands:
- "Alexa, open Custom URL Player"
- "Alexa, ask Custom URL Player to play from my app"
- "Alexa, ask Custom URL Player to play https://example.com/stream.m3u8"

## 📱 Mobile Integration:
Users can visit `https://travelsignals.org/alexa/` to paste URLs instead of speaking them!

Ready to deploy? Just follow the steps above!