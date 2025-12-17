import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/api';
import { AuthContext } from './AuthContext';
import { getUserStorageKey, clearGlobalData } from '../utils/userDataIsolation';

export const RechargeContext = createContext();

export const RechargeProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(5000);
  const [loading, setLoading] = useState(false);

  // Clear old global data on component mount
  useEffect(() => {
    clearGlobalData();
  }, []);

  // Get user-specific localStorage key for current user
  const getStorageKey = (key) => {
    return getUserStorageKey(key, user?.id);
  };

  // Fetch transactions from backend
  const fetchTransactions = async () => {
    if (!user?.id) {
      setTransactions([]);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching transactions from backend...');
      const data = await apiService.getRechargeHistory();
      console.log('Transactions received:', data);
      setTransactions(data || []);
      
      // Save to user-specific localStorage
      if (data && data.length > 0) {
        localStorage.setItem(getStorageKey('transactions'), JSON.stringify(data));
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Fallback to user-specific localStorage
      const saved = localStorage.getItem(getStorageKey('transactions'));
      if (saved) {
        const localTransactions = JSON.parse(saved);
        setTransactions(localTransactions);
        console.log('Using local transactions:', localTransactions.length);
      } else {
        setTransactions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load user-specific wallet balance
  useEffect(() => {
    if (user?.id) {
      const savedWallet = localStorage.getItem(getStorageKey('wallet'));
      if (savedWallet) {
        setWallet(parseInt(savedWallet));
      } else {
        setWallet(5000); // Default wallet balance for new users
      }
    } else {
      setWallet(5000);
    }
  }, [user?.id]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && user?.id) {
      fetchTransactions();
    } else if (!user?.id) {
      setTransactions([]);
    }
  }, [user?.id]);

  const addTransaction = async (transaction) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    try {
      console.log('Creating recharge:', transaction);
      const response = await apiService.createRecharge(transaction);
      console.log('Recharge created:', response);
      
      // Format transaction for display
      const formattedTransaction = response.recharge || {
        id: Date.now().toString(),
        type: 'Mobile Recharge',
        operator: transaction.operator,
        phoneNumber: transaction.phoneNumber,
        amount: transaction.amount,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };
      
      // Update local state
      const updatedTransactions = [formattedTransaction, ...transactions];
      setTransactions(updatedTransactions);
      const newWalletBalance = wallet - transaction.amount;
      setWallet(newWalletBalance);
      
      // Save to user-specific localStorage
      localStorage.setItem(getStorageKey('transactions'), JSON.stringify(updatedTransactions));
      localStorage.setItem(getStorageKey('wallet'), newWalletBalance.toString());
      
      return response;
    } catch (error) {
      console.warn('Backend not available, using local storage:', error.message);
      // Fallback for demo mode - don't throw error
      const formattedTransaction = {
        id: Date.now().toString(),
        type: 'Mobile Recharge',
        operator: transaction.operator,
        phoneNumber: transaction.phoneNumber,
        amount: transaction.amount,
        date: new Date().toISOString().split('T')[0],
        status: 'Success'
      };
      
      const updatedTransactions = [formattedTransaction, ...transactions];
      setTransactions(updatedTransactions);
      const newWalletBalance = wallet - transaction.amount;
      setWallet(newWalletBalance);
      
      localStorage.setItem(getStorageKey('transactions'), JSON.stringify(updatedTransactions));
      localStorage.setItem(getStorageKey('wallet'), newWalletBalance.toString());
      
      return { recharge: formattedTransaction };
    }
  };

  const addMoney = (amount) => {
    if (!user?.id) {
      throw new Error('User not authenticated');
    }

    const transaction = {
      id: Date.now(),
      type: 'Wallet Recharge',
      operator: 'Wallet',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      status: 'Success',
      phoneNumber: 'N/A',
      planDetails: 'Money added to wallet'
    };
    
    const updatedTransactions = [transaction, ...transactions];
    setTransactions(updatedTransactions);
    const newWalletBalance = wallet + amount;
    setWallet(newWalletBalance);
    
    // Save to user-specific localStorage
    localStorage.setItem(getStorageKey('transactions'), JSON.stringify(updatedTransactions));
    localStorage.setItem(getStorageKey('wallet'), newWalletBalance.toString());
    
    return transaction;
  };

  const getTotalRecharges = () => transactions.length;
  const getMonthlySpent = () => {
    const currentMonth = new Date().getMonth();
    return transactions
      .filter(t => new Date(t.date).getMonth() === currentMonth)
      .reduce((sum, t) => sum + t.amount, 0);
  };
  const getCashbackEarned = () => Math.floor(getMonthlySpent() * 0.02);

  return (
    <RechargeContext.Provider value={{
      transactions,
      wallet,
      loading,
      addTransaction,
      addMoney,
      getTotalRecharges,
      getMonthlySpent,
      getCashbackEarned,
      fetchTransactions
    }}>
      {children}
    </RechargeContext.Provider>
  );
};

export default RechargeProvider;