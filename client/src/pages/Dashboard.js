import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RechargeContext } from '../context/RechargeContext';
import { Wallet, History, TrendingUp, User, Plus } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import WalletRecharge from '../components/WalletRecharge';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { transactions, wallet, getTotalRecharges, getMonthlySpent, getCashbackEarned } = useContext(RechargeContext);
  const [showWalletRecharge, setShowWalletRecharge] = useState(false);

  const stats = [
    { icon: Wallet, title: 'Wallet Balance', value: `₹${wallet}`, color: 'blue' },
    { icon: History, title: 'Total Recharges', value: getTotalRecharges(), color: 'green' },
    { icon: TrendingUp, title: 'This Month', value: `₹${getMonthlySpent()}`, color: 'purple' },
    { icon: User, title: 'Cashback Earned', value: `₹${getCashbackEarned()}`, color: 'orange' }
  ];



  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <p>Here's your account overview</p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className={`stat-card ${stat.color}`}>
                <div className="stat-icon">
                  <Icon size={24} />
                </div>
                <div className="stat-content">
                  <h3>{stat.value}</h3>
                  <p>{stat.title}</p>
                  {stat.title === 'Wallet Balance' && (
                    <Button 
                      variant="outline" 
                      size="small" 
                      onClick={() => setShowWalletRecharge(true)}
                      className="add-money-btn"
                    >
                      <Plus size={16} /> Add Money
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="dashboard-content">
          <Card className="transactions-card">
            <h2>Recent Transactions</h2>
            <div className="transactions-list">
              {transactions.length > 0 ? (
                transactions.slice(0, 5).map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-info">
                      <h4>{transaction.type} - {transaction.operator}</h4>
                      <p>{transaction.phoneNumber}</p>
                      <p>{transaction.date}</p>
                    </div>
                    <div className="transaction-amount">
                      <span>₹{transaction.amount}</span>
                      <span className={`status ${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-transactions">No transactions yet. Start recharging to see your history!</p>
              )}
            </div>
          </Card>
        </div>
        
        <WalletRecharge 
          isOpen={showWalletRecharge}
          onClose={() => setShowWalletRecharge(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;