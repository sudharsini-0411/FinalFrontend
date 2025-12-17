import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I recharge my mobile?",
      answer: "Select your operator, choose a plan, enter your mobile number, and complete the payment. Your recharge will be processed instantly."
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept all major credit/debit cards, net banking, UPI, and digital wallets like Paytm, PhonePe, and Google Pay."
    },
    {
      question: "Is my payment information secure?",
      answer: "Yes, we use industry-standard encryption and secure payment gateways to protect your financial information."
    },
    {
      question: "What if my recharge fails?",
      answer: "If your recharge fails, the amount will be automatically refunded to your wallet or original payment method within 24-48 hours."
    },
    {
      question: "How can I check my transaction history?",
      answer: "Login to your account and go to the Dashboard. You can view all your transactions in the History section."
    },
    {
      question: "Can I get a refund for my recharge?",
      answer: "Refunds are only available for failed transactions. Successful recharges cannot be refunded as per telecom operator policies."
    },
    {
      question: "How do I add money to my wallet?",
      answer: "Go to your Dashboard, click on 'Add Money' and choose your preferred payment method to add funds to your wallet."
    },
    {
      question: "Are there any charges for using the service?",
      answer: "No, we don't charge any additional fees. You only pay the plan amount as per your operator's pricing."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="faq-page">
      <div className="container">
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about our recharge services.</p>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <div 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                {openFAQ === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {openFAQ === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;