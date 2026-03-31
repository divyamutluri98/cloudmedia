# Cloud Media News - GitHub Repository Setup Script (PowerShell)
# This script helps you push your code to GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  CLOUD MEDIA NEWS - GITHUB SETUP     " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first:" -ForegroundColor Red
    Write-Host "   Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Initialize git repository if not already done
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

Write-Host ""

# Configure git user (if not configured)
$currentName = git config --global user.name
if ([string]::IsNullOrEmpty($currentName)) {
    $gitUsername = Read-Host "Enter your Git username"
    git config --global user.name $gitUsername
}

$currentEmail = git config --global user.email
if ([string]::IsNullOrEmpty($currentEmail)) {
    $gitEmail = Read-Host "Enter your Git email"
    git config --global user.email $gitEmail
}

Write-Host "✅ Git user configured" -ForegroundColor Green
Write-Host ""

# Add all files
Write-Host "Adding all files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files staged" -ForegroundColor Green
Write-Host ""

# Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Cloud Media News - Production Ready with Vercel & Coolify support"
Write-Host "✅ Initial commit created" -ForegroundColor Green
Write-Host ""

# Show repository status
Write-Host "Current Git status:" -ForegroundColor Yellow
git status
Write-Host ""

# Ask for GitHub repository URL
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GITHUB REPOSITORY SETUP             " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$repoChoice = Read-Host "Have you already created a GitHub repository? (y/n)"

if ($repoChoice -eq "y" -or $repoChoice -eq "Y") {
    Write-Host ""
    $repoUrl = Read-Host "Enter your GitHub repository URL`nFormat: https://github.com/YOUR_USERNAME/cloudmedia.git"
    
    if (-not [string]::IsNullOrEmpty($repoUrl)) {
        # Check if remote already exists
        $existingRemote = git remote get-url origin 2>$null
        if ($existingRemote) {
            Write-Host "⚠️  Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
            $updateRemote = Read-Host "Update existing remote? (y/n)"
            if ($updateRemote -eq "y" -or $updateRemote -eq "Y") {
                git remote set-url origin $repoUrl
                Write-Host "✅ Remote 'origin' updated: $repoUrl" -ForegroundColor Green
            }
        } else {
            git remote add origin $repoUrl
            Write-Host "✅ Remote 'origin' added: $repoUrl" -ForegroundColor Green
        }
    } else {
        Write-Host "⚠️  No URL entered. Skipping remote setup." -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "Please create a new repository on GitHub:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/new"
    Write-Host "2. Repository name: cloudmedia"
    Write-Host "3. Choose Public or Private"
    Write-Host "4. DO NOT initialize with README (you already have code)"
    Write-Host "5. Click 'Create repository'"
    Write-Host ""
    Write-Host "After creating, copy the repository URL and run:" -ForegroundColor Cyan
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/cloudmedia.git" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  NEXT STEPS                          " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To push your code to GitHub:" -ForegroundColor Yellow
Write-Host "1. Make sure you've created the repository on GitHub"
Write-Host "2. Add the remote (if not done above):"
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/cloudmedia.git" -ForegroundColor White
Write-Host ""
Write-Host "3. Set main as default branch:"
Write-Host "   git branch -M main" -ForegroundColor White
Write-Host ""
Write-Host "4. Push to GitHub:"
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "After pushing, you can deploy to:" -ForegroundColor Green
Write-Host "- Vercel: https://vercel.com (import from GitHub)"
Write-Host "- Coolify: Connect to your GitHub repository"
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GOOD LUCK WITH YOUR DEPLOYMENT! 🚀  " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
