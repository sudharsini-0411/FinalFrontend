import React, { useState, useContext } from 'react';
import { RechargeContext } from '../context/RechargeContext';
import { toast } from 'react-hot-toast';
import Button from './Button';
import { X, CreditCard } from 'lucide-react';

const WalletRecharge = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const { addMoney } = useContext(RechargeContext);

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handleRecharge = (e) => {
    e.preventDefault();
    
    const rechargeAmount = parseInt(amount);
    if (!rechargeAmount || rechargeAmount < 10) {
      toast.error('Please enter amount of at least ₹10');
      return;
    }

    if (rechargeAmount > 50000) {
      toast.error('Maximum recharge amount is ₹50,000');
      return;
    }

    addMoney(rechargeAmount);
    toast.success(`₹${rechargeAmount} added to wallet successfully!`);
    onClose();
    setAmount('');
  };

  const handleQuickAmount = (quickAmount) => {
    setAmount(quickAmount.toString());
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content wallet-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3><CreditCard size={20} /> Add Money to Wallet</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          <form onSubmit={handleRecharge}>
            <div className="form-group">
              <label>Enter Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount (Min: ₹10)"
                min="10"
                max="50000"
                required
              />
            </div>

            <div className="quick-amounts">
              <label>Quick Select:</label>
              <div className="quick-buttons">
                {quickAmounts.map(quickAmount => (
                  <button
                    key={quickAmount}
                    type="button"
                    className="quick-btn"
                    onClick={() => handleQuickAmount(quickAmount)}
                  >
                    ₹{quickAmount}
                  </button>
                ))}
              </div>
            </div>

            <div className="payment-info">
              <h4>Payment Methods:</h4>
              <div className="payment-methods">
                <div className="payment-method">💳 Credit/Debit Card</div>
                <div className="payment-method">🏦 Net Banking</div>
                <div className="payment-method">📱 UPI</div>
                <div className="payment-method">💰 Wallet</div>
              </div>
            </div>

            <div className="modal-actions">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Add ₹{amount || '0'} to Wallet
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WalletRecharge;