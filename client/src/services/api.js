const API_BASE_URL = 'http://localhost:8001/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Endpoint not found');
        }
        const data = await response.json().catch(() => ({ message: 'Server error' }));
        throw new Error(data.message || `HTTP ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        throw new Error('Backend server is not running. Please start the backend server.');
      }
      throw error;
    }
  }

  // Auth methods
  async login(credentials) {
    try {
      return await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
    } catch (error) {
      // Fallback for demo purposes
      if (error.message.includes('Backend server is not running')) {
        if (credentials.email === 'sudharsini.r2024aids@sece.ac.in' && credentials.password === '1234') {
          return {
            token: 'demo-admin-token',
            user: { id: 'admin', name: 'Admin', email: credentials.email, role: 'admin' }
          };
        }
        return {
          token: 'demo-user-token',
          user: { id: 'user1', name: 'Demo User', email: credentials.email, role: 'user' }
        };
      }
      throw error;
    }
  }

  async register(userData) {
    try {
      return await this.request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });
    } catch (error) {
      // Fallback for demo purposes
      if (error.message.includes('Backend server is not running')) {
        return {
          token: 'demo-token',
          user: { id: 'new-user', name: userData.name, email: userData.email, role: 'user' }
        };
      }
      throw error;
    }
  }

  // User methods
  async getProfile() {
    return this.request('/auth/profile');
  }

  async updateProfile(profileData) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  // Plans methods
  async getPlans(operator = '') {
    const endpoint = operator ? `/plans?operator=${operator}` : '/plans';
    return await this.request(endpoint);
  }

  async createPlan(planData) {
    try {
      return await this.request('/plans', {
        method: 'POST',
        body: JSON.stringify(planData)
      });
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return { _id: Date.now().toString(), ...planData };
      }
      throw error;
    }
  }

  async updatePlan(planId, planData) {
    try {
      return await this.request(`/plans/${planId}`, {
        method: 'PUT',
        body: JSON.stringify(planData)
      });
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return { _id: planId, ...planData };
      }
      throw error;
    }
  }

  async deletePlan(planId) {
    try {
      return await this.request(`/plans/${planId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return { success: true };
      }
      throw error;
    }
  }

  // Recharge methods
  async getRecharges() {
    try {
      return await this.request('/recharge/history');
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return [];
      }
      throw error;
    }
  }

  async createRecharge(rechargeData) {
    try {
      return await this.request('/recharge', {
        method: 'POST',
        body: JSON.stringify(rechargeData)
      });
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return {
          recharge: {
            id: Date.now().toString(),
            type: 'Mobile Recharge',
            operator: rechargeData.operator,
            phoneNumber: rechargeData.phoneNumber,
            amount: rechargeData.amount,
            date: new Date().toISOString().split('T')[0],
            status: 'Success'
          }
        };
      }
      throw error;
    }
  }

  async getRechargeHistory() {
    try {
      return await this.request('/recharge/history');
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return [];
      }
      throw error;
    }
  }

  // Admin methods
  async getAllUsers() {
    try {
      return await this.request('/admin/users');
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return [];
      }
      throw error;
    }
  }

  async getAllRecharges() {
    try {
      return await this.request('/recharge/all');
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return [];
      }
      throw error;
    }
  }

  async getAnalytics() {
    try {
      return await this.request('/recharges/analytics');
    } catch (error) {
      if (error.message.includes('Backend server is not running')) {
        return { totalRecharges: 0, totalAmount: 0, todayRecharges: 0 };
      }
      throw error;
    }
  }
}

export default new ApiService();