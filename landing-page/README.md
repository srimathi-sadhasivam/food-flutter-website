# WellFood - Professional Food Delivery Landing Page

A modern, responsive food delivery landing page with professional OTP-based authentication system inspired by Blinkit and Swiggy.

## Features

- 🎨 Modern UI with Framer Motion animations
- 📱 Professional OTP-based authentication
- 🔐 Secure MongoDB user management
- 📞 SMS OTP verification (mock implementation)
- 🎯 Responsive design
- ⚡ Real-time form validation

## Tech Stack

### Frontend
- React 18
- Framer Motion
- Tailwind CSS
- Context API for state management

### Backend
- Node.js & Express
- MongoDB with Mongoose
- OTP generation and validation
- RESTful API endpoints

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wellfood
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key_here
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to project root:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend server:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/send-otp` - Send OTP to phone number
- `POST /api/auth/verify-otp` - Verify OTP code
- `POST /api/auth/complete-profile` - Complete user profile
- `GET /api/auth/profile/:phoneNumber` - Get user profile

## Authentication Flow

1. **Phone Number Entry**: User enters 10-digit mobile number
2. **OTP Generation**: System generates 6-digit OTP and sends via SMS
3. **OTP Verification**: User enters OTP for verification
4. **Profile Completion**: New users complete their profile (name, email)
5. **Login Success**: User is authenticated and can access the platform

## Features Implemented

✅ Professional login modal with modern UI
✅ Multi-step authentication flow
✅ Phone number validation
✅ OTP generation and verification
✅ User profile management
✅ MongoDB integration
✅ Context-based state management
✅ Responsive design
✅ Error handling and validation
✅ Loading states and animations

## SMS Integration

Currently using mock SMS service. To integrate with real SMS providers:

### Twilio Integration
```javascript
// In backend/utils/otpService.js
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

await client.messages.create({
  body: `Your WellFood verification code is: ${otp}. Valid for 10 minutes.`,
  from: process.env.TWILIO_PHONE_NUMBER,
  to: `+91${phoneNumber}`
});
```

## Database Schema

### User Model
```javascript
{
  phoneNumber: String (unique, required),
  name: String (required),
  email: String (optional),
  isVerified: Boolean,
  otp: {
    code: String,
    expiresAt: Date,
    attempts: Number
  },
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- OTP expiration (10 minutes)
- Maximum OTP attempts (3)
- Phone number validation
- Input sanitization
- Error handling

## Development

The application runs on:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Production Deployment

1. Build the frontend:
```bash
npm run build
```

2. Configure production environment variables
3. Deploy backend to your preferred hosting service
4. Deploy frontend build to static hosting

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
