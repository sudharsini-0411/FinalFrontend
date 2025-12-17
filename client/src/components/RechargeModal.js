import React, { useState, useContext } from 'react';
import { RechargeContext } from '../context/RechargeContext';
import { toast } from 'react-hot-toast';
import Button from './Button';
import { X } from 'lucide-react';

const RechargeModal = ({ plan, isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { addTransaction, wallet } = useContext(RechargeContext);

  const handleRecharge = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    if (wallet < plan.price) {
      toast.error('Insufficient wallet balance');
      return;
    }

    const transaction = {
      planId: plan._id || plan.id,
      phoneNumber: phoneNumber,
      operator: plan.operator,
      amount: plan.price
    };

    try {
      await addTransaction(transaction);
      toast.success(`Recharge of ₹${plan.price} successful!`);
      onClose();
      setPhoneNumber('');
    } catch (error) {
      toast.error('Recharge failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Recharge Confirmation</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <div className="plan-summary">
            <h4>{plan.operator.toUpperCase()} - ₹{plan.price}</h4>
            <p><strong>Data/Details:</strong> {plan.data || plan.description || 'Plan Details'}</p>
            <p><strong>Validity:</strong> {plan.validity || '28 days'}</p>
            <p><strong>Service:</strong> {plan.serviceType || 'Mobile'}</p>
            {plan.popular && <span className="popular-tag">Popular Plan</span>}
          </div>

          <form onSubmit={handleRecharge}>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
                required
              />
            </div>
            
            <div className="wallet-info">
              <p>Wallet Balance: ₹{wallet}</p>
              <p>Amount to Pay: ₹{plan.price}</p>
            </div>

            <div className="modal-actions">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Pay ₹{plan.price}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RechargeModal;