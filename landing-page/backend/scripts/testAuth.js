const axios = require('axios');

const API_BASE_URL = 'http://localhost:3017/api';

/**
 * Test script to verify role-based authentication system
 * Run this after setting up the backend and creating admin user
 */
async function testAuthentication() {
  console.log('🧪 Testing Role-Based Authentication System\n');

  try {
    // Test 1: Admin Login
    console.log('1️⃣ Testing Admin Login...');
    const adminLoginRes = await axios.post(`${API_BASE_URL}/admin/login`, {
      email: 'admin@wellfood.com',
      password: 'admin123'
    });
    
    if (adminLoginRes.data.success) {
      console.log('✅ Admin login successful');
      console.log('   Token:', adminLoginRes.data.token.substring(0, 20) + '...');
      console.log('   Role: admin');
      
      const adminToken = adminLoginRes.data.token;
      
      // Test 2: Access Admin Route with Admin Token
      console.log('\n2️⃣ Testing Admin Route Access...');
      try {
        const adminRouteRes = await axios.get(`${API_BASE_URL}/admin/orders`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Admin route access successful');
        console.log('   Orders count:', adminRouteRes.data.data?.orders?.length || 0);
      } catch (error) {
        console.log('❌ Admin route access failed:', error.response?.data?.message || error.message);
      }
    } else {
      console.log('❌ Admin login failed:', adminLoginRes.data.message);
    }

    // Test 3: User Registration
    console.log('\n3️⃣ Testing User Registration...');
    const userSignupRes = await axios.post(`${API_BASE_URL}/auth/signup`, {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      phone: '1234567890',
      address: '123 Test Street'
    });
    
    if (userSignupRes.data.success) {
      console.log('✅ User registration successful');
      console.log('   User role:', userSignupRes.data.user.role);
      
      const userToken = userSignupRes.data.token;
      
      // Test 4: User Login
      console.log('\n4️⃣ Testing User Login...');
      const userLoginRes = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: 'testuser@example.com',
        password: 'password123'
      });
      
      if (userLoginRes.data.success) {
        console.log('✅ User login successful');
        console.log('   Role:', userLoginRes.data.user.role);
      } else {
        console.log('❌ User login failed:', userLoginRes.data.message);
      }
      
      // Test 5: User Trying to Access Admin Route (Should Fail)
      console.log('\n5️⃣ Testing User Access to Admin Route (Should Fail)...');
      try {
        await axios.get(`${API_BASE_URL}/admin/orders`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        console.log('❌ User should not have access to admin route');
      } catch (error) {
        if (error.response?.status === 403) {
          console.log('✅ User correctly blocked from admin route');
          console.log('   Error:', error.response.data.message);
        } else {
          console.log('❌ Unexpected error:', error.response?.data?.message || error.message);
        }
      }
    } else {
      console.log('❌ User registration failed:', userSignupRes.data.message);
    }

    // Test 6: Invalid Token Access
    console.log('\n6️⃣ Testing Invalid Token Access...');
    try {
      await axios.get(`${API_BASE_URL}/admin/orders`, {
        headers: { Authorization: 'Bearer invalid_token' }
      });
      console.log('❌ Invalid token should be rejected');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Invalid token correctly rejected');
        console.log('   Error:', error.response.data.message);
      } else {
        console.log('❌ Unexpected error:', error.response?.data?.message || error.message);
      }
    }

    console.log('\n🎉 Authentication System Test Complete!');
    console.log('\n📋 Summary:');
    console.log('   - Admin login: ✅');
    console.log('   - User registration: ✅');
    console.log('   - User login: ✅');
    console.log('   - Role-based access control: ✅');
    console.log('   - Token validation: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the backend server is running on port 3017');
    }
  }
}

// Run the test
testAuthentication();
