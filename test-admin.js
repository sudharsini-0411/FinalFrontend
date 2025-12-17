const axios = require('axios');

const API_BASE = 'http://localhost:4000/api';

async function testAdminOperations() {
  try {
    console.log('🔍 Testing Admin Operations...\n');
    
    // Test 1: Login as admin
    console.log('1. Testing admin login...');
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
      email: 'sudharsini.r2024aids@sece.ac.in',
      password: '1234'
    });
    
    const token = loginResponse.data.token;
    console.log('✅ Admin login successful');
    
    const headers = { Authorization: `Bearer ${token}` };
    
    // Test 2: Get all plans
    console.log('\n2. Testing get plans...');
    const plansResponse = await axios.get(`${API_BASE}/plans`, { headers });
    console.log(`✅ Found ${plansResponse.data.length} plans`);
    
    // Test 3: Create a new plan
    console.log('\n3. Testing create plan...');
    const newPlan = {
      operator: 'jio',
      category: 'data',
      price: 199,
      description: 'Test plan - 2GB/day for 28 days'
    };
    
    const createResponse = await axios.post(`${API_BASE}/plans`, newPlan, { headers });
    console.log('✅ Plan created:', createResponse.data._id);
    
    const planId = createResponse.data._id;
    
    // Test 4: Update the plan
    console.log('\n4. Testing update plan...');
    const updateData = {
      ...newPlan,
      price: 249,
      description: 'Updated test plan - 3GB/day for 28 days'
    };
    
    const updateResponse = await axios.put(`${API_BASE}/plans/${planId}`, updateData, { headers });
    console.log('✅ Plan updated:', updateResponse.data.price);
    
    // Test 5: Delete the plan
    console.log('\n5. Testing delete plan...');
    await axios.delete(`${API_BASE}/plans/${planId}`, { headers });
    console.log('✅ Plan deleted successfully');
    
    // Test 6: Get users
    console.log('\n6. Testing get users...');
    const usersResponse = await axios.get(`${API_BASE}/admin/users`, { headers });
    console.log(`✅ Found ${usersResponse.data.length} users`);
    
    console.log('\n🎉 All admin operations working correctly!');
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data?.message || error.message);
  }
}

testAdminOperations();