# AWS Setup Guide for Alexa Skill

## 🎯 Easiest AWS Setup

### **Option 1: Create IAM User (Recommended)**

1. **Sign in to AWS Console**
   - Go to: https://aws.amazon.com/console/
   - Use your existing AWS account or create one

2. **Create IAM User**
   - Navigate to **IAM service** → **Users** → **Create user**
   - Username: `alexa-skill-user`
   - Select **"Access key - Programmatic access"**
   - Click **Next**

3. **Set Permissions**
   - Choose **"Attach policies directly"**
   - Search and add:
     - `AWSLambda_FullAccess`
     - `IAMFullAccess` (needed for role creation)
   - Click **Next** → **Create user**

4. **Save Credentials**
   - **Download the CSV file** (this contains your keys)
   - Keep it safe - you can't see secret key again!

### **Option 2: Use Root Account (Quick but Less Secure)**

1. In AWS Console → **My Security Credentials**
2. **Create access key**
3. **Download credentials**

## 🔧 Configure AWS CLI

```bash
aws configure
```

Enter the credentials from your CSV file:
```
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

## ✅ Verify Configuration

```bash
aws sts get-caller-identity
```

Should return your account info.

## 🚀 Deploy Skill

Once configured, run:
```bash
./deploy-complete.sh
```

## 🔑 Security Notes

- **Never share your credentials**
- **Don't commit credentials to git**
- **Use IAM user, not root account** when possible

## ❓ Still Having Issues?

1. **Check AWS account status** (active?)
2. **Verify region** (us-east-1 recommended)
3. **Try creating new access keys**
4. **Check IAM permissions**

**Ready to try AWS setup?**