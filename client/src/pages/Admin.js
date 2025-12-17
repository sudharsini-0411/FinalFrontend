import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RechargeContext } from '../context/RechargeContext';
import { toast } from 'react-hot-toast';
import Card from '../components/Card';
import Button from '../components/Button';
import { Users, CreditCard, Edit, Trash2, Plus, X } from 'lucide-react';
import apiService from '../services/api';

const Admin = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const { transactions, fetchTransactions } = useContext(RechargeContext);
  const [allTransactions, setAllTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('analytics');
  const [plans, setPlans] = useState([]);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [formData, setFormData] = useState({
    operator: '',
    price: '',
    description: '',
    category: 'data'
  });

  const getTodayRecharges = () => {
    const today = new Date().toISOString().split('T')[0];
    return allTransactions.filter(t => t.date === today);
  };

  const getRechargesByType = () => {
    const typeCount = {};
    allTransactions.forEach(t => {
      const type = t.type || 'Unknown';
      typeCount[type] = (typeCount[type] || 0) + 1;
    });
    return typeCount;
  };

  const getDailyRechargeStats = () => {
    const dailyStats = {};
    allTransactions.forEach(t => {
      const date = t.date;
      if (!dailyStats[date]) {
        dailyStats[date] = { count: 0, users: new Set(), amount: 0 };
      }
      dailyStats[date].count += 1;
      dailyStats[date].users.add(t.phoneNumber || t.userId);
      dailyStats[date].amount += t.amount;
    });
    
    // Convert Set to count
    Object.keys(dailyStats).forEach(date => {
      dailyStats[date].uniqueUsers = dailyStats[date].users.size;
      delete dailyStats[date].users;
    });
    
    return dailyStats;
  };

  const getMostUsedRechargeType = () => {
    const typeCount = getRechargesByType();
    const sortedTypes = Object.entries(typeCount).sort(([,a], [,b]) => b - a);
    return sortedTypes;
  };

  const todayRecharges = getTodayRecharges();
  const rechargesByType = getRechargesByType();
  const dailyStats = getDailyRechargeStats();
  const mostUsedTypes = getMostUsedRechargeType();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching plans from backend...');
        const plansData = await apiService.getPlans();
        setPlans(plansData || []);
        console.log('Plans loaded:', plansData.length);
        
        console.log('Fetching transactions...');
        const transactionsData = await apiService.getAllRecharges();
        setAllTransactions(transactionsData || []);
        console.log('Transactions loaded:', transactionsData.length);
        
        console.log('Fetching users...');
        const usersData = await apiService.getAllUsers();
        setUsers(usersData || []);
        console.log('Users loaded:', usersData.length);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Backend connection failed');
      }
    };
    
    fetchData();
  }, []);

  const handleAddPlan = async (e) => {
    e.preventDefault();
    try {
      const newPlan = await apiService.createPlan(formData);
      setPlans([...plans, newPlan]);
      setShowAddPlan(false);
      setFormData({ operator: '', price: '', description: '', category: 'data' });
      toast.success('Plan added successfully');
    } catch (error) {
      toast.error('Failed to add plan');
    }
  };

  const handleUpdatePlan = async (e) => {
    e.preventDefault();
    try {
      const updatedPlan = await apiService.updatePlan(editingPlan._id, formData);
      setPlans(plans.map(plan => plan._id === editingPlan._id ? updatedPlan : plan));
      setEditingPlan(null);
      setFormData({ operator: '', price: '', description: '', category: 'data' });
      toast.success('Plan updated successfully');
    } catch (error) {
      toast.error('Failed to update plan');
    }
  };

  const handleDeletePlan = async (planId) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await apiService.deletePlan(planId);
        setPlans(plans.filter(plan => plan._id !== planId));
        toast.success('Plan deleted successfully');
      } catch (error) {
        toast.error('Failed to delete plan');
      }
    }
  };

  const startEdit = (plan) => {
    setEditingPlan(plan);
    setFormData({
      operator: plan.operator,
      price: plan.price,
      description: plan.description,
      category: plan.category
    });
  };

  const cancelEdit = () => {
    setEditingPlan(null);
    setShowAddPlan(false);
    setFormData({ operator: '', price: '', description: '', category: 'data' });
  };

  if (!isAdmin()) {
    return (
      <div className="admin-access-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="admin-tabs">
          <button 
            className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 Analytics
          </button>
          <button 
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={20} /> User History
          </button>
          <button 
            className={`tab-btn ${activeTab === 'plans' ? 'active' : ''}`}
            onClick={() => setActiveTab('plans')}
          >
            <CreditCard size={20} /> Manage Plans
          </button>
        </div>

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>Recharge Analytics Dashboard</h2>
            
            <div className="analytics-grid">
              <Card className="analytics-card">
                <h3>📅 Today's Recharges</h3>
                <div className="stat-number">{todayRecharges.length}</div>
                <p>People: {new Set(todayRecharges.map(t => t.phoneNumber || t.userId)).size}</p>
                <p>Amount: ₹{todayRecharges.reduce((sum, t) => sum + t.amount, 0)}</p>
              </Card>
              
              <Card className="analytics-card">
                <h3>💰 Total Recharges</h3>
                <div className="stat-number">{allTransactions.length}</div>
                <p>All Time: ₹{allTransactions.reduce((sum, t) => sum + t.amount, 0)}</p>
              </Card>
              
              <Card className="analytics-card">
                <h3>🏆 Most Used Type</h3>
                <div className="stat-number">
                  {mostUsedTypes.length > 0 ? mostUsedTypes[0][0] : 'None'}
                </div>
                <p>Used {mostUsedTypes.length > 0 ? mostUsedTypes[0][1] : 0} times</p>
              </Card>
            </div>

            <div className="analytics-charts">
              <Card className="chart-card">
                <h3>📊 Daily People Recharge Chart</h3>
                <div className="bar-chart">
                  {Object.entries(dailyStats)
                    .sort(([a], [b]) => new Date(a) - new Date(b))
                    .slice(-7)
                    .map(([date, stats]) => {
                      const maxUsers = Math.max(...Object.values(dailyStats).map(s => s.uniqueUsers));
                      const height = maxUsers > 0 ? (stats.uniqueUsers / maxUsers) * 100 : 0;
                      return (
                        <div key={date} className="bar-item">
                          <div className="bar-container">
                            <div 
                              className="bar" 
                              style={{ height: `${height}%` }}
                              title={`${stats.uniqueUsers} people, ${stats.count} recharges`}
                            >
                              <span className="bar-value">{stats.uniqueUsers}</span>
                            </div>
                          </div>
                          <div className="bar-label">
                            {new Date(date).toLocaleDateString('en', {month: 'short', day: 'numeric'})}
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </Card>

              <Card className="chart-card">
                <h3>🎯 Recharge Type Distribution</h3>
                <div className="pie-chart-container">
                  <div className="pie-chart">
                    {mostUsedTypes.map(([type, count], index) => {
                      const percentage = allTransactions.length > 0 ? (count / allTransactions.length * 100) : 0;
                      const colors = ['#667eea', '#00b894', '#ff6b6b', '#fdcb6e', '#a29bfe'];
                      return (
                        <div key={type} className="pie-slice" style={{
                          background: `conic-gradient(${colors[index % colors.length]} 0deg ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg)`
                        }}></div>
                      );
                    })}
                  </div>
                  <div className="pie-legend">
                    {mostUsedTypes.map(([type, count], index) => {
                      const percentage = allTransactions.length > 0 ? (count / allTransactions.length * 100).toFixed(1) : 0;
                      const colors = ['#667eea', '#00b894', '#ff6b6b', '#fdcb6e', '#a29bfe'];
                      return (
                        <div key={type} className="legend-item">
                          <div className="legend-color" style={{ backgroundColor: colors[index % colors.length] }}></div>
                          <span className="legend-text">{type}: {count} ({percentage}%)</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>User Management</h2>
            
            <div className="users-stats">
              <Card className="analytics-card">
                <h3>👥 Total Users</h3>
                <div className="stat-number">{users.length}</div>
                <p>Registered Users</p>
              </Card>
              <Card className="analytics-card">
                <h3>🔑 Total Logins</h3>
                <div className="stat-number">{users.reduce((sum, u) => sum + (u.loginCount || 0), 0)}</div>
                <p>All Time Logins</p>
              </Card>
            </div>
            
            <h3>Registered Users ({users.length})</h3>
            <div className="users-list">
              {users.length > 0 ? (
                users.map(user => (
                  <Card key={user._id} className="user-card">
                    <div className="user-info">
                      <h4>{user.name}</h4>
                      <p>Email: {user.email}</p>
                      <p>Role: {user.role}</p>
                      <p>Login Count: {user.loginCount || 0}</p>
                      {user.lastLogin && <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>}
                      {user.createdAt && <p>Registered: {new Date(user.createdAt).toLocaleDateString()}</p>}
                    </div>
                  </Card>
                ))
              ) : (
                <div className="no-users">
                  <p>No users found</p>
                  <p>Users will appear here after they login</p>
                </div>
              )}
            </div>
            
            <h3>User Transactions ({allTransactions.length})</h3>
            <div className="transactions-list">
              {allTransactions.length > 0 ? (
                allTransactions.map(transaction => (
                  <Card key={transaction.id || transaction._id} className="transaction-card">
                    <div className="transaction-info">
                      <h4>{transaction.type} - {transaction.operator}</h4>
                      <p>Phone: {transaction.phoneNumber}</p>
                      <p>Amount: ₹{transaction.amount}</p>
                      <p>Date: {transaction.date}</p>
                      <p>Status: {transaction.status}</p>
                      <p>User ID: {typeof transaction.userId === 'object' ? transaction.userId._id || transaction.userId.id : transaction.userId}</p>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="no-transactions">
                  <p>No transactions found</p>
                  <p>Create some recharges to see them here</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'plans' && (
          <div className="plans-section">
            <div className="plans-header">
              <h2>Manage Plans ({plans.length} total)</h2>
              <Button onClick={() => setShowAddPlan(true)}>
                <Plus size={20} /> Add New Plan
              </Button>
            </div>

            {(showAddPlan || editingPlan) && (
              <Card className="plan-form-card">
                <div className="form-header">
                  <h3>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</h3>
                  <Button variant="outline" onClick={cancelEdit}>
                    <X size={20} />
                  </Button>
                </div>
                <form onSubmit={editingPlan ? handleUpdatePlan : handleAddPlan}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Operator</label>
                      <select
                        value={formData.operator}
                        onChange={(e) => setFormData({...formData, operator: e.target.value})}
                        required
                      >
                        <option value="">Select Operator</option>
                        <option value="jio">Jio</option>
                        <option value="airtel">Airtel</option>
                        <option value="vi">Vi</option>
                        <option value="bsnl">BSNL</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      >
                        <option value="data">Data</option>
                        <option value="unlimited">Unlimited</option>
                        <option value="talktime">Talktime</option>
                        <option value="combo">Combo</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Plan description..."
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <Button type="button" variant="outline" onClick={cancelEdit}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingPlan ? 'Update Plan' : 'Add Plan'}
                    </Button>
                  </div>
                </form>
              </Card>
            )}
            
            <div className="plans-grid">
              {console.log('Rendering plans:', plans) || ''}
              {plans && plans.length > 0 ? (
                plans.map(plan => (
                  <Card key={plan._id || plan.id} className="admin-plan-card">
                    <div className="plan-info">
                      <div className="plan-header">
                        <h4>{(plan.operator || 'Unknown').toUpperCase()}</h4>
                        <span className="category-badge">{plan.category || 'general'}</span>
                      </div>
                      <div className="plan-price">₹{plan.price || 0}</div>
                      <p className="plan-description">{plan.description || 'No description'}</p>
                    </div>
                    <div className="plan-actions">
                      <Button 
                        size="small" 
                        variant="outline"
                        onClick={() => startEdit(plan)}
                      >
                        <Edit size={16} /> Edit
                      </Button>
                      <Button 
                        size="small" 
                        variant="danger" 
                        onClick={() => handleDeletePlan(plan._id || plan.id)}
                      >
                        <Trash2 size={16} /> Delete
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="no-plans">
                  <p>No plans available (Total: {plans ? plans.length : 0})</p>
                  <p>Click "Add New Plan" to create your first plan</p>
                  <p>Debug: {JSON.stringify(plans)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;