#!/bin/bash

# Role-Based Authentication Setup Script
# This script sets up the complete role-based authentication system

echo "🚀 Setting up Role-Based Authentication System for WellFood"
echo "=========================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

print_success "Node.js is installed: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "npm is installed: $(npm --version)"

# Backend setup
print_status "Setting up backend..."
cd backend

# Install backend dependencies
print_status "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Create admin user
print_status "Creating default admin user..."
npm run create-admin

if [ $? -eq 0 ]; then
    print_success "Admin user created successfully"
    print_warning "Default admin credentials: admin@wellfood.com / admin123"
    print_warning "Please change the password after first login!"
else
    print_error "Failed to create admin user"
    exit 1
fi

cd ..

# Frontend setup
print_status "Setting up frontend..."
cd landing-page

# Install frontend dependencies
print_status "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

cd ..

# Create environment files if they don't exist
print_status "Setting up environment configuration..."

# Backend .env
if [ ! -f "backend/.env" ]; then
    cat > backend/.env << EOF
# Backend Environment Variables
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
MONGODB_URI=mongodb://localhost:27017/wellfood
PORT=3017
NODE_ENV=development
EOF
    print_success "Created backend .env file"
else
    print_warning "Backend .env file already exists"
fi

# Frontend .env
if [ ! -f "landing-page/.env" ]; then
    cat > landing-page/.env << EOF
# Frontend Environment Variables
REACT_APP_API_URL=http://localhost:3017/api
REACT_APP_ENV=development
EOF
    print_success "Created frontend .env file"
else
    print_warning "Frontend .env file already exists"
fi

# Test the authentication system
print_status "Testing authentication system..."
cd backend
npm run test-auth

if [ $? -eq 0 ]; then
    print_success "Authentication system test passed"
else
    print_warning "Authentication system test failed - check if MongoDB is running"
fi

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "📋 Next Steps:"
echo "1. Start MongoDB database"
echo "2. Start backend server: cd backend && npm start"
echo "3. Start frontend server: cd landing-page && npm start"
echo ""
echo "🔐 Default Admin Credentials:"
echo "   Email: admin@wellfood.com"
echo "   Password: admin123"
echo ""
echo "⚠️  IMPORTANT: Change the default admin password after first login!"
echo ""
echo "📖 For detailed documentation, see: ROLE_BASED_AUTH_SETUP.md"
echo ""
echo "🧪 To test the system: cd backend && npm run test-auth"
echo ""
