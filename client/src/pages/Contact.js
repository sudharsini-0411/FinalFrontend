import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Download } from 'lucide-react';
import Button from '../components/Button';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submittedMessages, setSubmittedMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageData = {
      ...formData,
      timestamp: new Date().toLocaleString(),
      id: Date.now()
    };
    
    setSubmittedMessages(prev => [...prev, messageData]);
    toast.success('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const downloadMessages = () => {
    if (submittedMessages.length === 0) {
      toast.error('No messages to download');
      return;
    }

    const content = submittedMessages.map(msg => 
      `Message ID: ${msg.id}\nName: ${msg.name}\nEmail: ${msg.email}\nSubject: ${msg.subject}\nMessage: ${msg.message}\nTimestamp: ${msg.timestamp}\n\n---\n\n`
    ).join('');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact-messages-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Messages downloaded successfully!');
  };

  return (
    <div className="contact-page">
      <div className="container">
        <h1>Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We're here to help! Reach out to us through any of the following methods.</p>
            
            <div className="contact-methods">
              <div className="contact-method">
                <Phone size={24} />
                <div>
                  <h4>Phone</h4>
                  <p>+91 12345 67890</p>
                </div>
              </div>
              
              <div className="contact-method">
                <Mail size={24} />
                <div>
                  <h4>Email</h4>
                  <p>support@rechargeapp.com</p>
                </div>
              </div>
              
              <div className="contact-method">
                <MapPin size={24} />
                <div>
                  <h4>Address</h4>
                  <p>123 Tech Street, Digital City, India 560001</p>
                </div>
              </div>
              
              <div className="contact-method">
                <Clock size={24} />
                <div>
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <div className="form-header">
              <h2>Send us a Message</h2>
              {submittedMessages.length > 0 && (
                <button 
                  type="button" 
                  className="download-btn"
                  onClick={downloadMessages}
                  title="Download submitted messages"
                >
                  <Download size={16} />
                  Download ({submittedMessages.length})
                </button>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <textarea
                  placeholder="Your Message"
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              
              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;