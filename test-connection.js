const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect('mongodb://localhost:27017/rechargeapp');
    console.log('✅ MongoDB connected successfully');
    
    // Test if plans exist
    const Product = require('./Backend(Mern)/src/models/productModel');
    const plans = await Product.find();
    console.log(`✅ Found ${plans.length} plans in database`);
    
    if (plans.length > 0) {
      console.log('Sample plan:', plans[0]);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();