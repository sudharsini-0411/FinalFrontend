import React from 'react';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: December 2025</p>
        
        <div className="terms-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing and using RechargeApp, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2>2. Service Description</h2>
            <p>RechargeApp provides mobile recharge, DTH recharge, bill payment, and related services. We act as an intermediary between you and service providers.</p>
          </section>

          <section>
            <h2>3. User Responsibilities</h2>
            <ul>
              <li>Provide accurate information for all transactions</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service only for lawful purposes</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2>4. Payment Terms</h2>
            <ul>
              <li>All payments are processed securely through our payment partners</li>
              <li>Transaction fees, if any, will be clearly displayed before payment</li>
              <li>Refunds are subject to our refund policy and operator terms</li>
            </ul>
          </section>

          <section>
            <h2>5. Limitation of Liability</h2>
            <p>RechargeApp shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.</p>
          </section>

          <section>
            <h2>6. Privacy</h2>
            <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
          </section>

          <section>
            <h2>7. Modifications</h2>
            <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.</p>
          </section>

          <section>
            <h2>8. Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at support@rechargeapp.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;