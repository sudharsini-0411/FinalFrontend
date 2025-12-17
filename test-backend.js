const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testBackend() {
  console.log('Testing Backend Connection...\n');

  try {
    // Test 1: Admin Login
    console.log('1. Testing Admin Login...');
    const loginResponse = await axios.post(`${BASE_URL}/users/login`, {
      email: 'sudharsini.r2024aids@sece.ac.in',
      password: '1234'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Admin login successful');
    console.log('Token:', token.substring(0, 20) + '...\n');

    // Test 2: Create Recharge
    console.log('2. Testing Recharge Creation...');
    const rechargeResponse = await axios.post(`${BASE_URL}/recharges`, {
      operator: 'jio',
      phone: '9876543210',
      amount: 199,
      type: 'Mobile Recharge',
      planDetails: {
        data: '2GB/day',
        validity: '28 days',
        benefits: ['Unlimited calls', 'SMS']
      }
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Recharge created successfully');
    console.log('Recharge ID:', rechargeResponse.data._id, '\n');

    // Test 3: Get Recharge History
    console.log('3. Testing Recharge History...');
    const historyResponse = await axios.get(`${BASE_URL}/recharges/history`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Recharge history retrieved');
    console.log('Total recharges:', historyResponse.data.length, '\n');

    console.log('🎉 All tests passed! Backend is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure the backend server is running:');
      console.log('   cd "Backend(Mern)"');
      console.log('   npm run dev');
    }
  }
}

testBackend();