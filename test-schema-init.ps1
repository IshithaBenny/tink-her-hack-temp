# Test script for schema initialization
Write-Host "⏳ Waiting for dev server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "🧪 Testing schema initialization..." -ForegroundColor Cyan
Write-Host ""

# Test 1: Check if server is running
Write-Host "TEST 1: Server health check" -ForegroundColor Green
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing -ErrorAction SilentlyContinue
    Write-Host "  Status: $($response.StatusCode)" -ForegroundColor Green
} catch {
    Write-Host "  Status: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}
Write-Host ""

# Test 2: Manual schema init
Write-Host "TEST 2: Manual schema initialization" -ForegroundColor Green
try {
    $initResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/admin/init-schema" `
        -Method POST `
        -UseBasicParsing `
        -ContentType "application/json" `
        -ErrorAction SilentlyContinue
    
    Write-Host "  Status Code: $($initResponse.StatusCode)" -ForegroundColor Green
    $json = $initResponse.Content | ConvertFrom-Json
    Write-Host "  Message: $($json.message)" -ForegroundColor Yellow
    Write-Host "  Stats: Statements=$($json.stats.totalStatements), Success=$($json.stats.successful), Errors=$($json.stats.errors)" -ForegroundColor Yellow
} catch {
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: Check Supabase connection
Write-Host "TEST 3: Supabase connection test" -ForegroundColor Green
try {
    $testResponse = Invoke-WebRequest -Uri "http://localhost:3000/api/debug/test-supabase" `
        -Method POST `
        -UseBasicParsing `
        -ContentType "application/json" `
        -ErrorAction SilentlyContinue
    
    Write-Host "  Status Code: $($testResponse.StatusCode)" -ForegroundColor Green
    $json = $testResponse.Content | ConvertFrom-Json
    Write-Host "  Message: $($json.message)" -ForegroundColor Yellow
} catch {
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ Tests completed. Check the dev server logs for detailed output." -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Visit http://localhost:3000/signup" -ForegroundColor White
Write-Host "  2. Try to create a new account" -ForegroundColor White
Write-Host "  3. Check the browser console for any errors" -ForegroundColor White
