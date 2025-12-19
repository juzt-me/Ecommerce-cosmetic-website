import React, { createContext, useContext, useState } from 'react';

const RewardsContext = createContext();

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};

export const RewardsProvider = ({ children }) => {
  const [points, setPoints] = useState(1250);
  const [tier, setTier] = useState('Gold');

  const addPoints = (amount) => {
    setPoints(prev => prev + amount);
    updateTier(points + amount);
  };

  const redeemPoints = (amount) => {
    if (points >= amount) {
      setPoints(prev => prev - amount);
      updateTier(points - amount);
      return true;
    }
    return false;
  };

  const updateTier = (currentPoints) => {
    if (currentPoints >= 1000) {
      setTier('Gold');
    } else if (currentPoints >= 500) {
      setTier('Silver');
    } else {
      setTier('Bronze');
    }
  };

  const value = {
    points,
    tier,
    addPoints,
    redeemPoints
  };

  return (
    <RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>
  );
};