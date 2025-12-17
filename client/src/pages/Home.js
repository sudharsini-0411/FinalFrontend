import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, Tv, Wifi, Zap, CreditCard, Gift } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Home = () => {
  const navigate = useNavigate();
  
  const services = [
    { icon: Smartphone, title: 'Mobile Recharge', desc: 'Quick mobile top-ups', route: '/plans?type=mobile' },
    { icon: Tv, title: 'DTH Recharge', desc: 'TV recharge services', route: '/plans?type=dth' },
    { icon: CreditCard, title: 'Data Card', desc: 'Internet data plans', route: '/plans?type=datacard' },
    { icon: Wifi, title: 'Broadband', desc: 'Broadband bill payments', route: '/plans?type=broadband' },
    { icon: Zap, title: 'Electricity', desc: 'Electricity bill payments', route: '/plans?type=electricity' },
    { icon: Gift, title: 'Offers', desc: 'Special deals & cashback', route: '/plans?type=offers' }
  ];

  const handleServiceClick = (route) => {
    navigate(route);
  };

  const handleRechargeNow = () => {
    navigate('/plans');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Recharge & Bill Payments Made Easy</h1>
          <p>Fast, secure, and convenient recharge services for all your needs</p>
          <div className="hero-buttons">
            <Button size="large" onClick={handleRechargeNow}>Recharge Now</Button>
            <Button variant="outline" size="large" onClick={handleGetStarted}>Get Started</Button>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  hover 
                  className="service-card"
                  onClick={() => handleServiceClick(service.route)}
                >
                  <Icon size={40} />
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <h3>🚀 Instant Recharge</h3>
              <p>Lightning-fast recharge processing</p>
            </div>
            <div className="feature">
              <h3>🔒 Secure Payments</h3>
              <p>Bank-grade security for all transactions</p>
            </div>
            <div className="feature">
              <h3>💰 Best Offers</h3>
              <p>Exclusive deals and cashback rewards</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;