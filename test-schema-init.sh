#!/bin/bash

# Wait for dev server to start
echo "⏳ Waiting for dev server to start..."
sleep 5

echo "🧪 Testing schema initialization..."
echo ""

# Test 1: Check if server is running
echo "TEST 1: Server health check"
RESPONSE=$(curl -s -w "\n%{http_code}" http://localhost:3000/ 2>/dev/null || echo "000")
HTTP_CODE=$(echo "$RESPONSE" | tail -n 1)
echo "  Status: $HTTP_CODE"
echo ""

# Test 2: Manual schema init
echo "TEST 2: Manual schema initialization"
INIT_RESPONSE=$(curl -s -X POST http://localhost:3000/api/admin/init-schema 2>/dev/null)
echo "  Response: $INIT_RESPONSE" | head -c 200
echo ""
echo ""

# Test 3: Check Supabase connection
echo "TEST 3: Supabase connection test"
TEST_RESPONSE=$(curl -s -X POST http://localhost:3000/api/debug/test-supabase 2>/dev/null)
echo "  Response: $TEST_RESPONSE" | head -c 200
echo ""
echo ""

echo "✅ Tests completed. Check the dev server logs for detailed output."
