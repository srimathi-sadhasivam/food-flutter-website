# Role-Based Authentication Setup Guide

This guide explains how to set up and use the role-based authentication system for WellFood.

## 🎯 Features Implemented

### ✅ Backend Features
- **User Model**: Includes role field (admin/user) with proper validation
- **Admin Model**: Separate admin collection with secure authentication
- **JWT Tokens**: Include role information for secure authorization
- **Role-Based Middleware**: Protect routes based on user roles
- **Authentication Routes**: Handle login/signup with role assignment

### ✅ Frontend Features
- **Role-Based Routing**: Automatic redirects based on user role
- **Protected Routes**: Prevent unauthorized access to admin areas
- **User Dashboard**: Dedicated home page for regular users
- **Admin Dashboard**: Protected admin interface
- **Login/Signup UI**: Maintains your existing beautiful UI

## 🚀 Quick Setup

### 1. Backend Setup

```bash
cd landing-page/backend
npm install
```

### 2. Create Default Admin User

```bash
cd landing-page/backend
node scripts/createAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@wellfood.com`
- Password: `admin123`

⚠️ **Important**: Change the default password after first login!

### 3. Start Backend Server

```bash
cd landing-page/backend
npm start
```

### 4. Frontend Setup

```bash
cd landing-page
npm install
npm start
```

## 🔐 Authentication Flow

### User Login Flow
1. User enters email/password
2. System checks if user exists
3. If role is "admin" → redirect to `/admin-dashboard`
4. If role is "user" → redirect to `/home`
5. JWT token includes role information

### Route Protection
- **Admin Routes**: Only accessible by users with `role: 'admin'`
- **User Routes**: Only accessible by users with `role: 'user'`
- **Public Routes**: Accessible by everyone (landing page, login)

## 📁 File Structure

```
landing-page/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model with role field
│   │   └── Admin.js         # Admin model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── admin.js         # Admin-specific routes
│   ├── middleware/
│   │   └── roleAuth.js      # Role-based authentication middleware
│   ├── utils/
│   │   └── auth.js          # JWT utilities
│   └── scripts/
│       └── createAdmin.js   # Admin user creation script
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx   # Route protection component
│   │   └── AppRouter.jsx        # Main routing logic
│   ├── pages/
│   │   ├── Home.jsx             # User dashboard
│   │   └── admin/               # Admin pages
│   └── context/
│       └── AuthContext.js       # Authentication context
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Backend (.env)
JWT_SECRET=your_super_secret_jwt_key_here
MONGODB_URI=mongodb://localhost:27017/wellfood
PORT=3017

# Frontend (.env)
REACT_APP_API_URL=http://localhost:3017/api
```

### Database Schema

#### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  phoneNumber: String,
  role: String (enum: ['user', 'admin']),
  address: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Admin Collection
```javascript
{
  _id: ObjectId,
  email: String,
  passwordHash: String,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛡️ Security Features

### JWT Token Structure
```javascript
{
  id: "user_id",
  role: "admin" | "user",
  email: "user@example.com",
  exp: 1234567890
}
```

### Route Protection Levels
1. **Public Routes**: No authentication required
2. **User Routes**: Requires `role: 'user'`
3. **Admin Routes**: Requires `role: 'admin'`

### Middleware Chain
```javascript
// Admin route example
router.get('/admin/orders', 
  authenticateUser,    // Verify JWT and attach user
  requireAdmin,        // Check if user is admin
  async (req, res) => {
    // Route handler
  }
);
```

## 🎨 Frontend Components

### ProtectedRoute Component
```jsx
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

### Authentication Context
```jsx
const { user, role, isAuthenticated, login, logout } = useAuth();
```

## 🔄 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/admin/login` - Admin login

### Protected Routes
- `GET /api/admin/orders` - Get orders (admin only)
- `GET /api/admin/users` - Get users (admin only)
- `POST /api/admin/update-order` - Update order (admin only)

## 🧪 Testing

### Test Admin Login
```bash
curl -X POST http://localhost:3017/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@wellfood.com","password":"admin123"}'
```

### Test User Login
```bash
curl -X POST http://localhost:3017/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## 🚨 Troubleshooting

### Common Issues

1. **"User not found" error**
   - Check if user exists in database
   - Verify email/password combination

2. **"Admin access required" error**
   - Ensure user has `role: 'admin'` in database
   - Check JWT token includes correct role

3. **Route protection not working**
   - Verify ProtectedRoute component is wrapping routes
   - Check authentication context is properly set up

4. **JWT token issues**
   - Ensure JWT_SECRET is set in environment
   - Check token expiration

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=true
```

## 🔒 Security Best Practices

1. **Change Default Admin Password**: Immediately after setup
2. **Use Strong JWT Secret**: Generate a random, long secret
3. **HTTPS in Production**: Always use HTTPS for production
4. **Rate Limiting**: Implement rate limiting for auth endpoints
5. **Input Validation**: Validate all user inputs
6. **Password Policy**: Enforce strong password requirements

## 📝 Customization

### Adding New Roles
1. Update User model enum
2. Add role-specific middleware
3. Update frontend routing logic
4. Add role-specific components

### Custom Route Protection
```javascript
// Custom role middleware
const requireManager = (req, res, next) => {
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Manager access required' });
  }
  next();
};
```

## 🎉 Success!

Your role-based authentication system is now fully functional! Users will be automatically redirected based on their role, and admin routes are properly protected.

For support or questions, check the code comments or refer to the individual component documentation.
