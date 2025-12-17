import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>RechargeApp</h3>
          <p>Your trusted partner for mobile recharge, bill payments, and more.</p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><Link to="/plans">Mobile Recharge</Link></li>
            <li><Link to="/plans">DTH Recharge</Link></li>
            <li><Link to="/plans">Data Card</Link></li>
            <li><Link to="/plans">Broadband</Link></li>
            <li><Link to="/plans">Electricity</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link to="/help">Help Center</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <Phone size={16} />
              <span>+91 12345 67890</span>
            </div>
            <div className="contact-item">
              <Mail size={16} />
              <span>support@rechargeapp.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 RechargeApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;