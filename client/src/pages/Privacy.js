import React from 'react';

const Privacy = () => {
  return (
    <div className="privacy-page">
      <div className="container">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: December 2025</p>
        
        <div className="privacy-content">
          <section>
            <h2>1. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>Name, email address, and phone number</li>
              <li>Payment information (processed securely by our payment partners)</li>
              <li>Transaction history and recharge details</li>
            </ul>
            
            <h3>Usage Information</h3>
            <ul>
              <li>Device information and IP address</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our service</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <ul>
              <li>Process your recharge and payment transactions</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send transaction confirmations and service updates</li>
              <li>Improve our services and user experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share information with:</p>
            <ul>
              <li>Service providers (telecom operators, payment gateways)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners for transaction processing</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2>5. Cookies</h2>
            <p>We use cookies to enhance your experience, analyze usage patterns, and provide personalized content. You can control cookie settings through your browser.</p>
          </section>

          <section>
            <h2>6. Your Rights</h2>
            <ul>
              <li>Access and update your personal information</li>
              <li>Request deletion of your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section>
            <h2>7. Data Retention</h2>
            <p>We retain your information for as long as necessary to provide services and comply with legal obligations.</p>
          </section>

          <section>
            <h2>8. Contact Us</h2>
            <p>For privacy-related questions or concerns, contact us at privacy@rechargeapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;