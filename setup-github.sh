#!/bin/bash

# Cloud Media News - GitHub Repository Setup Script
# This script helps you push your code to GitHub

echo "========================================"
echo "  CLOUD MEDIA NEWS - GITHUB SETUP      "
echo "========================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   Windows: https://git-scm.com/download/win"
    echo "   Mac: brew install git"
    echo "   Linux: sudo apt install git"
    exit 1
fi

echo "✅ Git found!"
echo ""

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""

# Configure git user (if not configured)
if [ -z "$(git config --global user.name)" ]; then
    echo "Enter your Git username:"
    read -r git_username
    git config --global user.name "$git_username"
fi

if [ -z "$(git config --global user.email)" ]; then
    echo "Enter your Git email:"
    read -r git_email
    git config --global user.email "$git_email"
fi

echo "✅ Git user configured"
echo ""

# Add all files
echo "Adding all files to Git..."
git add .
echo "✅ Files staged"
echo ""

# Create initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: Cloud Media News - Production Ready with Vercel & Coolify support"
echo "✅ Initial commit created"
echo ""

# Show repository status
echo "Current Git status:"
git status
echo ""

# Ask for GitHub repository URL
echo "========================================"
echo "  GITHUB REPOSITORY SETUP              "
echo "========================================"
echo ""
echo "Have you already created a GitHub repository?"
echo "1) Yes, I have the repository URL"
echo "2) No, I need to create one first"
echo ""
read -r repo_choice

if [ "$repo_choice" = "1" ]; then
    echo ""
    echo "Enter your GitHub repository URL:"
    echo "Format: https://github.com/YOUR_USERNAME/cloudmedia.git"
    read -r repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ Remote 'origin' added: $repo_url"
    else
        echo "⚠️  No URL entered. Skipping remote setup."
    fi
else
    echo ""
    echo "Please create a new repository on GitHub:"
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: cloudmedia"
    echo "3. Choose Public or Private"
    echo "4. DO NOT initialize with README (you already have code)"
    echo "5. Click 'Create repository'"
    echo ""
    echo "After creating, copy the repository URL and run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/cloudmedia.git"
    echo ""
fi

echo ""
echo "========================================"
echo "  NEXT STEPS                           "
echo "========================================"
echo ""
echo "To push your code to GitHub:"
echo "1. Make sure you've created the repository on GitHub"
echo "2. Add the remote (if not done above):"
echo "   git remote add origin https://github.com/YOUR_USERNAME/cloudmedia.git"
echo ""
echo "3. Set main as default branch:"
echo "   git branch -M main"
echo ""
echo "4. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "After pushing, you can deploy to:"
echo "- Vercel: https://vercel.com (import from GitHub)"
echo "- Coolify: Connect to your GitHub repository"
echo ""
echo "========================================"
echo "  GOOD LUCK WITH YOUR DEPLOYMENT! 🚀   "
echo "========================================"
