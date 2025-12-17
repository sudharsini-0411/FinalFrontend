import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import RechargeModal from '../components/RechargeModal';
import apiService from '../services/api';

const Plans = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const serviceType = searchParams.get('type') || 'mobile';
  
  const [selectedOperator, setSelectedOperator] = useState('all');
  const [selectedTab, setSelectedTab] = useState('data');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiPlans, setApiPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const serviceConfig = {
    mobile: { title: 'Mobile Recharge Plans', operators: ['all', 'jio', 'airtel', 'vi', 'bsnl'] },
    dth: { title: 'DTH Recharge Plans', operators: ['all', 'tatasky', 'airtel', 'dish', 'videocon'] },
    datacard: { title: 'Data Card Plans', operators: ['all', 'jio', 'airtel', 'vi', 'bsnl'] },
    broadband: { title: 'Broadband Plans', operators: ['all', 'jio', 'airtel', 'bsnl', 'act'] },
    electricity: { title: 'Electricity Bill Payment', operators: ['all', 'bescom', 'kseb', 'mseb', 'tneb'] },
    offers: { title: 'Special Offers', operators: ['all', 'cashback', 'discount', 'combo'] }
  };
  
  const currentService = serviceConfig[serviceType] || serviceConfig.mobile;

  const operators = currentService.operators;
  const tabs = serviceType === 'electricity' ? ['monthly', 'quarterly', 'yearly'] : 
              serviceType === 'offers' ? ['cashback', 'discount', 'combo'] :
              ['data', 'unlimited', 'talktime', 'combo'];

  // Fetch plans from backend API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await apiService.getPlans();
        setApiPlans(data);
      } catch (error) {
        console.error('Error fetching plans:', error);
        toast.error('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPlans();
  }, []);
  
  const getPlansForService = () => {
    // Fallback plans for all services
    const fallbackPlans = {
      mobile: {
        data: [
          { id: 'm1', operator: 'jio', price: 149, validity: '28 days', data: '2GB/day', popular: true },
          { id: 'm2', operator: 'airtel', price: 179, validity: '28 days', data: '2GB/day', popular: false },
          { id: 'm3', operator: 'vi', price: 199, validity: '28 days', data: '2GB/day', popular: false }
        ],
        unlimited: [
          { id: 'm4', operator: 'jio', price: 399, validity: '84 days', data: 'Unlimited', popular: true },
          { id: 'm5', operator: 'airtel', price: 449, validity: '84 days', data: 'Unlimited', popular: false }
        ],
        talktime: [
          { id: 'm6', operator: 'jio', price: 99, validity: '28 days', data: '1GB', popular: false },
          { id: 'm7', operator: 'bsnl', price: 79, validity: '28 days', data: '500MB', popular: false }
        ],
        combo: [
          { id: 'm8', operator: 'jio', price: 299, validity: '28 days', data: '2GB/day + Calls', popular: true }
        ]
      },
      dth: {
        data: [
          { id: 'd1', operator: 'tatasky', price: 299, validity: '30 days', data: '150+ Channels', popular: true },
          { id: 'd2', operator: 'airtel', price: 349, validity: '30 days', data: '200+ Channels', popular: false },
          { id: 'd3', operator: 'dish', price: 279, validity: '30 days', data: '120+ Channels', popular: false }
        ],
        unlimited: [
          { id: 'd4', operator: 'dish', price: 599, validity: '30 days', data: 'All Channels', popular: true },
          { id: 'd5', operator: 'airtel', price: 649, validity: '30 days', data: 'All HD Channels', popular: false }
        ],
        talktime: [
          { id: 'd6', operator: 'videocon', price: 199, validity: '30 days', data: '100+ Channels', popular: false },
          { id: 'd7', operator: 'dish', price: 229, validity: '30 days', data: '130+ Channels', popular: false }
        ],
        combo: [
          { id: 'd8', operator: 'tatasky', price: 499, validity: '30 days', data: 'HD + Sports', popular: true }
        ]
      },
      datacard: {
        data: [
          { id: 'dc1', operator: 'jio', price: 199, validity: '28 days', data: '25GB', popular: true },
          { id: 'dc2', operator: 'airtel', price: 249, validity: '28 days', data: '30GB', popular: false },
          { id: 'dc3', operator: 'vi', price: 299, validity: '28 days', data: '40GB', popular: false }
        ],
        unlimited: [
          { id: 'dc4', operator: 'jio', price: 499, validity: '28 days', data: 'Unlimited', popular: true },
          { id: 'dc5', operator: 'airtel', price: 549, validity: '28 days', data: 'Unlimited', popular: false }
        ],
        talktime: [
          { id: 'dc6', operator: 'jio', price: 149, validity: '28 days', data: '12GB', popular: false },
          { id: 'dc7', operator: 'vi', price: 169, validity: '28 days', data: '15GB', popular: false }
        ],
        combo: [
          { id: 'dc8', operator: 'jio', price: 399, validity: '28 days', data: '50GB + Hotspot', popular: true }
        ]
      },
      broadband: {
        data: [
          { id: 'b1', operator: 'jio', price: 699, validity: '30 days', data: '100 Mbps', popular: true },
          { id: 'b2', operator: 'airtel', price: 799, validity: '30 days', data: '100 Mbps', popular: false },
          { id: 'b3', operator: 'bsnl', price: 599, validity: '30 days', data: '50 Mbps', popular: false }
        ],
        unlimited: [
          { id: 'b4', operator: 'jio', price: 1499, validity: '30 days', data: '1 Gbps', popular: true },
          { id: 'b5', operator: 'airtel', price: 1699, validity: '30 days', data: '1 Gbps', popular: false }
        ],
        talktime: [
          { id: 'b6', operator: 'bsnl', price: 449, validity: '30 days', data: '25 Mbps', popular: false },
          { id: 'b7', operator: 'act', price: 499, validity: '30 days', data: '40 Mbps', popular: false }
        ],
        combo: [
          { id: 'b8', operator: 'jio', price: 999, validity: '30 days', data: '200 Mbps + OTT', popular: true }
        ]
      },
      electricity: {
        monthly: [
          { id: 'e1', operator: 'bescom', price: 1200, validity: 'Monthly', data: 'Up to 200 Units', popular: true },
          { id: 'e2', operator: 'kseb', price: 800, validity: 'Monthly', data: 'Up to 150 Units', popular: false },
          { id: 'e3', operator: 'mseb', price: 1500, validity: 'Monthly', data: 'Up to 250 Units', popular: false }
        ],
        quarterly: [
          { id: 'e4', operator: 'mseb', price: 3500, validity: 'Quarterly', data: 'Up to 600 Units', popular: true },
          { id: 'e5', operator: 'bescom', price: 3200, validity: 'Quarterly', data: 'Up to 550 Units', popular: false }
        ],
        yearly: [
          { id: 'e6', operator: 'tneb', price: 12000, validity: 'Yearly', data: 'Up to 2400 Units', popular: false },
          { id: 'e7', operator: 'bescom', price: 11500, validity: 'Yearly', data: 'Up to 2200 Units', popular: false }
        ]
      },
      offers: {
        cashback: [
          { id: 'o1', operator: 'cashback', price: 199, validity: '28 days', data: '10% Cashback', popular: true },
          { id: 'o2', operator: 'cashback', price: 399, validity: '84 days', data: '15% Cashback', popular: false },
          { id: 'o3', operator: 'cashback', price: 599, validity: '180 days', data: '20% Cashback', popular: false }
        ],
        discount: [
          { id: 'o4', operator: 'discount', price: 149, validity: '28 days', data: '25% Off', popular: true },
          { id: 'o5', operator: 'discount', price: 299, validity: '84 days', data: '30% Off', popular: false },
          { id: 'o6', operator: 'discount', price: 499, validity: '180 days', data: '40% Off', popular: false }
        ],
        combo: [
          { id: 'o7', operator: 'combo', price: 349, validity: '28 days', data: 'Mobile + DTH', popular: true },
          { id: 'o8', operator: 'combo', price: 699, validity: '84 days', data: 'All Services', popular: false },
          { id: 'o9', operator: 'combo', price: 999, validity: '180 days', data: 'Premium Bundle', popular: false }
        ]
      }
    };
    
    // Use API plans if available, otherwise fallback
    const groupedPlans = {};
    
    if (apiPlans.length > 0) {
      // Filter plans by service type
      const servicePlans = apiPlans.filter(plan => 
        (plan.serviceType || 'mobile') === serviceType
      );
      
      // Group API plans by type
      tabs.forEach(tab => {
        groupedPlans[tab] = servicePlans.filter(plan => 
          plan.type && plan.type.toLowerCase() === tab.toLowerCase()
        ).map(plan => ({
          ...plan,
          id: plan._id,
          data: plan.benefits ? plan.benefits.join(', ') : plan.validity
        }));
      });
    } else {
      // Use fallback plans
      tabs.forEach(tab => {
        groupedPlans[tab] = fallbackPlans[serviceType] && fallbackPlans[serviceType][tab] ? 
          fallbackPlans[serviceType][tab] : [];
      });
    }
    
    return groupedPlans;
  };
  
  const plans = getPlansForService();
  
  // Set default tab if current tab doesn't exist for this service
  useEffect(() => {
    if (!plans[selectedTab]) {
      setSelectedTab(tabs[0]);
    }
  }, [serviceType, plans, selectedTab, tabs]);

  const filteredPlans = (plans[selectedTab] || []).filter(
    plan => selectedOperator === 'all' || plan.operator.toLowerCase().includes(selectedOperator.toLowerCase())
  );

  const handleRecharge = (plan) => {
    if (!user) {
      toast.error('Please login to recharge');
      navigate('/login');
      return;
    }
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <div className="plans">
      <div className="container">
        <h1>{currentService.title}</h1>
        
        <div className="filters">
          <div className="operator-filter">
            {operators.map(op => (
              <button
                key={op}
                className={`filter-btn ${selectedOperator === op ? 'active' : ''}`}
                onClick={() => setSelectedOperator(op)}
              >
                {op.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="plan-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-btn ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">Loading plans...</div>
        ) : (
          <div className="plans-grid">
            {filteredPlans.length > 0 ? (
              filteredPlans.map(plan => (
                <Card key={plan._id || plan.id} className="plan-card">
                  {plan.popular && <div className="popular-badge">Popular</div>}
                  <div className="plan-operator">{(plan.operator || 'Default').toUpperCase()}</div>
                  <div className="plan-price">₹{plan.price}</div>
                  <div className="plan-details">
                    <p><strong>Validity:</strong> {plan.validity}</p>
                    <p><strong>Data:</strong> {plan.data || plan.description}</p>
                    {plan.benefits && (
                      <div className="plan-benefits">
                        <p><strong>Benefits:</strong></p>
                        <ul>
                          {Array.isArray(plan.benefits) ? 
                            plan.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            )) : 
                            <li>{plan.benefits}</li>
                          }
                        </ul>
                      </div>
                    )}
                  </div>
                  <Button onClick={() => handleRecharge(plan)} className="recharge-btn">
                    Recharge Now
                  </Button>
                </Card>
              ))
            ) : (
              <div className="no-plans">
                <p>No plans available for this selection</p>
                <p>Try selecting a different operator or category</p>
              </div>
            )}
          </div>
        )}
        
        {selectedPlan && (
          <RechargeModal 
            plan={selectedPlan}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
};

export default Plans;