const express = require('express');
const router = express.Router();

// Mock plans data
const plans = {
  jio: [
    { id: 1, price: 199, validity: '28 days', data: '2GB/day', type: 'data', benefits: ['Unlimited calls', 'SMS'] },
    { id: 2, price: 399, validity: '56 days', data: '2GB/day', type: 'data', benefits: ['Unlimited calls', 'SMS'] }
  ],
  airtel: [
    { id: 3, price: 179, validity: '28 days', data: '2GB/day', type: 'data', benefits: ['Unlimited calls', 'SMS'] },
    { id: 4, price: 349, validity: '56 days', data: '2GB/day', type: 'data', benefits: ['Unlimited calls', 'SMS'] }
  ]
};

// Get plans by operator
router.get('/:operator', (req, res) => {
  const { operator } = req.params;
  const operatorPlans = plans[operator.toLowerCase()] || [];
  res.json(operatorPlans);
});

// Get all plans
router.get('/', (req, res) => {
  const allPlans = Object.values(plans).flat();
  res.json(allPlans);
});

module.exports = router;