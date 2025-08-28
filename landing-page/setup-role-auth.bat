@echo off
REM Role-Based Authentication Setup Script for Windows
REM This script sets up the complete role-based authentication system

echo 🚀 Setting up Role-Based Authentication System for WellFood
echo ==========================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [SUCCESS] Node.js is installed: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo [SUCCESS] npm is installed:
npm --version

REM Backend setup
echo [INFO] Setting up backend...
cd backend

REM Install backend dependencies
echo [INFO] Installing backend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo [ERROR] Failed to install backend dependencies
    pause
    exit /b 1
)

echo [SUCCESS] Backend dependencies installed successfully

REM Create admin user
echo [INFO] Creating default admin user...
call npm run create-admin

if %errorlevel% neq 0 (
    echo [ERROR] Failed to create admin user
    pause
    exit /b 1
)

echo [SUCCESS] Admin user created successfully
echo [WARNING] Default admin credentials: admin@wellfood.com / admin123
echo [WARNING] Please change the password after first login!

cd ..

REM Frontend setup
echo [INFO] Setting up frontend...
cd landing-page

REM Install frontend dependencies
echo [INFO] Installing frontend dependencies...
call npm install

if %errorlevel% neq 0 (
    echo [ERROR] Failed to install frontend dependencies
    pause
    exit /b 1
)

echo [SUCCESS] Frontend dependencies installed successfully

cd ..

REM Create environment files if they don't exist
echo [INFO] Setting up environment configuration...

REM Backend .env
if not exist "backend\.env" (
    (
        echo # Backend Environment Variables
        echo JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
        echo MONGODB_URI=mongodb://localhost:27017/wellfood
        echo PORT=3017
        echo NODE_ENV=development
    ) > backend\.env
    echo [SUCCESS] Created backend .env file
) else (
    echo [WARNING] Backend .env file already exists
)

REM Frontend .env
if not exist "landing-page\.env" (
    (
        echo # Frontend Environment Variables
        echo REACT_APP_API_URL=http://localhost:3017/api
        echo REACT_APP_ENV=development
    ) > landing-page\.env
    echo [SUCCESS] Created frontend .env file
) else (
    echo [WARNING] Frontend .env file already exists
)

REM Test the authentication system
echo [INFO] Testing authentication system...
cd backend
call npm run test-auth

if %errorlevel% neq 0 (
    echo [WARNING] Authentication system test failed - check if MongoDB is running
) else (
    echo [SUCCESS] Authentication system test passed
)

cd ..

echo.
echo 🎉 Setup Complete!
echo ==================
echo.
echo 📋 Next Steps:
echo 1. Start MongoDB database
echo 2. Start backend server: cd backend ^&^& npm start
echo 3. Start frontend server: cd landing-page ^&^& npm start
echo.
echo 🔐 Default Admin Credentials:
echo    Email: admin@wellfood.com
echo    Password: admin123
echo.
echo ⚠️  IMPORTANT: Change the default admin password after first login!
echo.
echo 📖 For detailed documentation, see: ROLE_BASED_AUTH_SETUP.md
echo.
echo 🧪 To test the system: cd backend ^&^& npm run test-auth
echo.
pause
