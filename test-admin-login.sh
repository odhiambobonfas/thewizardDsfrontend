#!/bin/bash

# TheWizarDs Admin Login Test Script
# This script tests the admin login functionality

echo "=================================="
echo "🧙 TheWizarDs Admin Login Tester"
echo "=================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend is running
echo "📡 Checking backend server..."
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Backend is running on http://localhost:5000"
else
    echo -e "${RED}✗${NC} Backend is NOT running!"
    echo -e "${YELLOW}→${NC} Start backend with: cd backend && npm run dev"
    exit 1
fi

echo ""
echo "🔐 Testing admin login..."
echo ""

# Test admin login
response=$(curl -s -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@thewizards.com",
    "password": "admin123"
  }')

# Check if login was successful
if echo "$response" | grep -q '"success":true'; then
    echo -e "${GREEN}✓ LOGIN SUCCESSFUL!${NC}"
    echo ""
    echo "Response:"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    echo ""
    echo -e "${GREEN}=================================="
    echo "✓ Admin login is working!"
    echo "==================================${NC}"
    echo ""
    echo "📝 Login Credentials:"
    echo "   Email: admin@thewizards.com"
    echo "   Password: admin123"
    echo ""
    echo "🌐 Access Points:"
    echo "   • Admin Login: http://localhost:3000/admin/login"
    echo "   • Admin Dashboard: http://localhost:3000/admin/dashboard"
    echo ""
else
    echo -e "${RED}✗ LOGIN FAILED!${NC}"
    echo ""
    echo "Response:"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    echo ""
    echo -e "${RED}=================================="
    echo "✗ Admin login is NOT working"
    echo "==================================${NC}"
    echo ""
    echo "Possible issues:"
    echo "1. Check backend/.env file has correct credentials"
    echo "2. Make sure JWT_SECRET is set in backend/.env"
    echo "3. Check backend logs for errors"
fi

echo ""
echo "🧪 Additional tests..."
echo ""

# Test team endpoint
echo "Testing team endpoint..."
if curl -s http://localhost:5000/api/team > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Team API is accessible"
else
    echo -e "${RED}✗${NC} Team API is not accessible"
fi

# Test admin dashboard (should fail without token)
echo "Testing protected admin endpoint..."
dashboard_response=$(curl -s http://localhost:5000/api/admin/dashboard)
if echo "$dashboard_response" | grep -q 'Access denied'; then
    echo -e "${GREEN}✓${NC} Admin routes are properly protected"
else
    echo -e "${YELLOW}⚠${NC} Admin protection may need verification"
fi

echo ""
echo "=================================="
echo "✅ Test Complete"
echo "=================================="
