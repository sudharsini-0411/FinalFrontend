const mongoose = require('mongoose');

// Test MongoDB connection
async function testConnection() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/rechargeapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully');
    
    // Test creating a user
    const User = require('./Backend(Mern)/models/User');
    
    const testUser = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: '1234',
      phone: '1234567890'
    });
    
    await testUser.save();
    console.log('✅ Test user created:', testUser.email);
    
    // Check if user exists
    const users = await User.find();
    console.log('📊 Total users in database:', users.length);
    
    await mongoose.disconnect();
    console.log('✅ Test completed');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();