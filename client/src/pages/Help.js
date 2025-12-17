import React, { useState } from 'react';
import { Search, Phone, Mail, MessageCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);

  const helpTopics = {
    'How to recharge mobile': 'Go to Plans page, select your operator and plan, enter mobile number, and complete payment.',
    'Payment methods': 'We accept Credit/Debit cards, Net Banking, UPI, and digital wallets like Paytm, PhonePe.',
    'Transaction failed': 'If transaction fails, amount will be refunded within 24-48 hours. Check your wallet or contact support.',
    'Refund policy': 'Refunds are processed for failed transactions only. Successful recharges cannot be refunded.',
    'Create account': 'Click Sign Up, fill your details, verify email/phone, and start using our services.',
    'Update profile': 'Go to Dashboard > Profile to update your personal information and preferences.',
    'Forgot password': 'Click "Forgot Password" on login page and follow the instructions sent to your email.',
    'Wallet management': 'Add money to wallet from Dashboard. Use wallet balance for quick recharges.',
    'App not working': 'Clear browser cache, check internet connection, or try using a different browser.',
    'Login problems': 'Ensure correct credentials, check caps lock, or reset password if needed.',
    'Payment gateway issues': 'Try different payment method or contact your bank if payment is declined.',
    'Browser compatibility': 'Use latest Chrome, Firefox, Safari, or Edge for best experience.'
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(selectedTopic === topic ? null : topic);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTopics = Object.keys(helpTopics).filter(topic =>
    topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="help-page">
      <div className="container">
        <h1>Help Center</h1>
        
        <div className="help-search">
          <div className="search-box">
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search for help..." 
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        {searchTerm ? (
          <div className="search-results">
            <h3>Search Results</h3>
            {filteredTopics.length > 0 ? (
              <div className="help-card">
                <ul>
                  {filteredTopics.map(topic => (
                    <li key={topic} onClick={() => handleTopicClick(topic)}>
                      {topic}
                      {selectedTopic === topic && (
                        <div className="topic-answer">{helpTopics[topic]}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No results found. Try different keywords.</p>
            )}
          </div>
        ) : (
          <div className="help-categories">
            <div className="help-card">
              <h3>Recharge & Payments</h3>
              <ul>
                <li onClick={() => handleTopicClick('How to recharge mobile')}>How to recharge mobile
                  {selectedTopic === 'How to recharge mobile' && <div className="topic-answer">{helpTopics['How to recharge mobile']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Payment methods')}>Payment methods
                  {selectedTopic === 'Payment methods' && <div className="topic-answer">{helpTopics['Payment methods']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Transaction failed')}>Transaction failed
                  {selectedTopic === 'Transaction failed' && <div className="topic-answer">{helpTopics['Transaction failed']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Refund policy')}>Refund policy
                  {selectedTopic === 'Refund policy' && <div className="topic-answer">{helpTopics['Refund policy']}</div>}
                </li>
              </ul>
            </div>

            <div className="help-card">
              <h3>Account & Profile</h3>
              <ul>
                <li onClick={() => handleTopicClick('Create account')}>Create account
                  {selectedTopic === 'Create account' && <div className="topic-answer">{helpTopics['Create account']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Update profile')}>Update profile
                  {selectedTopic === 'Update profile' && <div className="topic-answer">{helpTopics['Update profile']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Forgot password')}>Forgot password
                  {selectedTopic === 'Forgot password' && <div className="topic-answer">{helpTopics['Forgot password']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Wallet management')}>Wallet management
                  {selectedTopic === 'Wallet management' && <div className="topic-answer">{helpTopics['Wallet management']}</div>}
                </li>
              </ul>
            </div>

            <div className="help-card">
              <h3>Technical Issues</h3>
              <ul>
                <li onClick={() => handleTopicClick('App not working')}>App not working
                  {selectedTopic === 'App not working' && <div className="topic-answer">{helpTopics['App not working']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Login problems')}>Login problems
                  {selectedTopic === 'Login problems' && <div className="topic-answer">{helpTopics['Login problems']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Payment gateway issues')}>Payment gateway issues
                  {selectedTopic === 'Payment gateway issues' && <div className="topic-answer">{helpTopics['Payment gateway issues']}</div>}
                </li>
                <li onClick={() => handleTopicClick('Browser compatibility')}>Browser compatibility
                  {selectedTopic === 'Browser compatibility' && <div className="topic-answer">{helpTopics['Browser compatibility']}</div>}
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="contact-support">
          <h2>Still need help?</h2>
          <div className="support-options">
            <div className="support-option" onClick={() => toast.success('Calling +91 12345 67890...')}>
              <Phone size={24} />
              <h4>Call Us</h4>
              <p>+91 12345 67890</p>
            </div>
            <div className="support-option" onClick={() => toast.success('Opening email client...')}>
              <Mail size={24} />
              <h4>Email Us</h4>
              <p>support@rechargeapp.com</p>
            </div>
            <div className="support-option" onClick={() => toast.success('Live chat will be available soon!')}>
              <MessageCircle size={24} />
              <h4>Live Chat</h4>
              <p>Available 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;