# Cloud Media News - Lovable.dev Integration Script
# Run this AFTER downloading code from Lovable.dev

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  LOVABLE.DEV CODE INTEGRATION       " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if lovable-output directory exists
if (-not (Test-Path ".\lovable-output")) {
    Write-Host "❌ Error: 'lovable-output' folder not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please download code from Lovable.dev first and extract it to 'lovable-output' folder" -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Do you want to continue anyway? (y/n)"
    if ($continue -ne 'y') {
        exit
    }
} else {
    Write-Host "✅ Found lovable-output folder" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Step 1: Creating backup of current src folder..." -ForegroundColor Cyan
$backupName = "src-backup-" + (Get-Date -Format "yyyyMMdd-HHmmss")
Copy-Item -Path ".\src" -Destination ".\$backupName" -Recurse -Force
Write-Host "✅ Backup created: $backupName" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Step 2: Integrating components from Lovable..." -ForegroundColor Cyan

# Copy components
if (Test-Path ".\lovable-output\src\react-app\components") {
    Copy-Item -Path ".\lovable-output\src\react-app\components\*" -Destination ".\src\react-app\components\" -Recurse -Force
    Write-Host "✅ Components copied" -ForegroundColor Green
} else {
    Write-Host "⚠️  No components folder found in lovable-output" -ForegroundColor Yellow
}

# Copy pages
if (Test-Path ".\lovable-output\src\react-app\pages") {
    Copy-Item -Path ".\lovable-output\src\react-app\pages\*" -Destination ".\src\react-app\pages\" -Recurse -Force
    Write-Host "✅ Pages copied" -ForegroundColor Green
} else {
    Write-Host "⚠️  No pages folder found in lovable-output" -ForegroundColor Yellow
}

# Copy hooks
if (Test-Path ".\lovable-output\src\react-app\hooks") {
    Copy-Item -Path ".\lovable-output\src\react-app\hooks\*" -Destination ".\src\react-app\hooks\" -Recurse -Force
    Write-Host "✅ Hooks copied" -ForegroundColor Green
}

# Copy stores
if (Test-Path ".\lovable-output\src\react-app\stores") {
    Copy-Item -Path ".\lovable-output\src\react-app\stores\*" -Destination ".\src\react-app\stores\" -Recurse -Force
    Write-Host "✅ Stores copied" -ForegroundColor Green
}

# Copy types
if (Test-Path ".\lovable-output\src\react-app\types") {
    Copy-Item -Path ".\lovable-output\src\react-app\types\*" -Destination ".\src\react-app\types\" -Recurse -Force
    Write-Host "✅ Types copied" -ForegroundColor Green
}

Write-Host ""
Write-Host "📦 Step 3: Installing additional dependencies..." -ForegroundColor Cyan

# Install React Helmet Async
Write-Host "Installing react-helmet-async..." -ForegroundColor Gray
npm install react-helmet-async

# Install TipTap Editor
Write-Host "Installing TipTap editor packages..." -ForegroundColor Gray
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/extension-link

# Install React Player
Write-Host "Installing react-player..." -ForegroundColor Gray
npm install react-player

# Install Recharts
Write-Host "Installing recharts..." -ForegroundColor Gray
npm install recharts

Write-Host ""
Write-Host "✅ All dependencies installed!" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Step 4: Checking for TypeScript errors..." -ForegroundColor Cyan
Write-Host "(This may take a minute...)" -ForegroundColor Gray

# Run type check (optional, comment out if too slow)
# npm run check

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  INTEGRATION COMPLETE! 🎉            " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Review the changes in your src folder" -ForegroundColor White
Write-Host "2. Update App.tsx with new routes (see LOVABLE_INTEGRATION_GUIDE.md)" -ForegroundColor White
Write-Host "3. Run 'npm run dev' to test everything" -ForegroundColor White
Write-Host "4. If issues exist, restore backup: Copy-Item .\$backupName .\src -Recurse -Force" -ForegroundColor White
Write-Host ""

$openDevServer = Read-Host "Do you want to start the dev server now? (y/n)"
if ($openDevServer -eq 'y') {
    Write-Host ""
    Write-Host "🚀 Starting development server..." -ForegroundColor Cyan
    npm run dev
}
