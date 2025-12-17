// Utility functions for user data isolation

/**
 * Clear all user-specific data from localStorage
 * @param {string} userId - The user ID
 */
export const clearUserData = (userId) => {
  if (!userId) return;
  
  const keysToRemove = [
    `transactions_${userId}`,
    `wallet_${userId}`,
    `profile_${userId}`
  ];
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
  });
  
  console.log(`Cleared data for user: ${userId}`);
};

/**
 * Clear all old global data that might cause cross-user contamination
 */
export const clearGlobalData = () => {
  const globalKeys = ['transactions', 'wallet', 'user'];
  
  globalKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value && !key.includes('_')) {
      localStorage.removeItem(key);
      console.log(`Cleared old global data: ${key}`);
    }
  });
};

/**
 * Get user-specific storage key
 * @param {string} key - Base key name
 * @param {string} userId - User ID
 * @returns {string} User-specific key
 */
export const getUserStorageKey = (key, userId) => {
  return userId ? `${key}_${userId}` : `${key}_guest`;
};

/**
 * Verify user data isolation by checking if any global data exists
 * @returns {boolean} True if data is properly isolated
 */
export const verifyDataIsolation = () => {
  const globalKeys = ['transactions', 'wallet'];
  const hasGlobalData = globalKeys.some(key => {
    const value = localStorage.getItem(key);
    return value && !key.includes('_');
  });
  
  return !hasGlobalData;
};