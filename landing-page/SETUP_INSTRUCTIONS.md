# WellFood Setup Instructions

## 🔧 Fixing Connection Issues

### Prerequisites
1. **MongoDB**: Make sure MongoDB is installed and running on your system
2. **Node.js**: Ensure you have Node.js installed (version 14 or higher)

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service or run `mongod`
- **Mac/Linux**: Run `sudo systemctl start mongod` or `brew services start mongodb`

### Step 3: Start the Servers

#### Option 1: Using the batch file (Windows)
```bash
# Double click on start-dev.bat or run:
start-dev.bat
```

#### Option 2: Using npm scripts
```bash
# Install concurrently first
npm install

# Start both servers
npm run dev
```

#### Option 3: Manual start
```bash
# Terminal 1 - Start Backend
cd backend
npm start

# Terminal 2 - Start Frontend
npm start
```

### Step 4: Verify Connection

1. **Backend**: Open http://localhost:3017 in your browser
   - Should show: `{"message":"WellFood API Server Running","timestamp":"...","status":"active"}`

2. **Frontend**: Open http://localhost:3000 in your browser
   - Should load the WellFood landing page

3. **Test API**: Open http://localhost:3017/api/test
   - Should show: `{"message":"Auth API is working","timestamp":"..."}`

### Troubleshooting

#### If you get "Network Error":
1. Check if both servers are running
2. Verify MongoDB is running
3. Check browser console for CORS errors
4. Ensure ports 3000 and 3017 are not blocked

#### If you get "Failed to connect":
1. Check if the backend server is running on port 3017
2. Verify MongoDB connection in backend console
3. Check if the API URL is correct in the frontend

#### If MongoDB connection fails:
1. Install MongoDB if not installed
2. Start MongoDB service
3. Check if MongoDB is running on port 27017

### API Endpoints

- **Signup**: POST http://localhost:3017/api/auth/signup
- **Login**: POST http://localhost:3017/api/auth/login
- **Test**: GET http://localhost:3017/api/test

### Environment Variables

The application uses these default URLs:
- Frontend: http://localhost:3000
- Backend: http://localhost:3017
- MongoDB: mongodb://localhost:27017/myfood

If you need to change these, create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:3017/api
```

### Database

The application will automatically create a database called `myfood` in MongoDB when you first register a user.

### Success Indicators

✅ **Backend running**: Console shows "🚀 Server running on port 3017" and "✅ Connected to MongoDB"
✅ **Frontend running**: Console shows "Local: http://localhost:3000"
✅ **Login/Signup working**: Users are stored in MongoDB and can log in successfully
