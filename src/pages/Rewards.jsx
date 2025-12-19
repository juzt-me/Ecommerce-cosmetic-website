import React, { useState } from 'react';
import './Rewards.css';

const Rewards = () => {
  const user = { firstName: 'Guest' }; // Simplified for now
  const [points, setPoints] = useState(1250);
  const [tier] = useState('Gold');

  const rewards = [
    { id: 1, name: '10% Off Next Purchase', points: 500, type: 'discount' },
    { id: 2, name: 'Free Lipstick', points: 800, type: 'product' },
    { id: 3, name: 'Free Shipping', points: 300, type: 'shipping' },
    { id: 4, name: '20% Off Premium Products', points: 1000, type: 'discount' }
  ];

  const tiers = [
    { name: 'Bronze', min: 0, benefits: ['5% birthday discount', 'Early sale access'] },
    { name: 'Silver', min: 500, benefits: ['10% birthday discount', 'Free shipping on orders $50+'] },
    { name: 'Gold', min: 1000, benefits: ['15% birthday discount', 'Free shipping always', 'Exclusive products'] }
  ];

  const redeemReward = (reward) => {
    if (points >= reward.points) {
      setPoints(prev => prev - reward.points);
      alert(`Redeemed: ${reward.name}`);
    } else {
      alert('Insufficient points!');
    }
  };



  return (
    <div className="container rewards-page">
      <div className="rewards-header">
        <h1>Rewards & Loyalty</h1>
        <div className="points-display">
          <span className="points-number">{points}</span>
          <span className="points-label">Points</span>
        </div>
      </div>

      <div className="tier-status">
        <h3>Your Tier: {tier}</h3>
        <div className="tier-progress">
          {tiers.map(t => (
            <div key={t.name} className={`tier ${tier === t.name ? 'active' : ''}`}>
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rewards-grid">
        <div className="available-rewards">
          <h3>Available Rewards</h3>
          {rewards.map(reward => (
            <div key={reward.id} className="reward-card">
              <div className="reward-info">
                <h4>{reward.name}</h4>
                <span className="reward-points">{reward.points} points</span>
              </div>
              <button 
                className={`redeem-btn ${points >= reward.points ? '' : 'disabled'}`}
                onClick={() => redeemReward(reward)}
                disabled={points < reward.points}
              >
                Redeem
              </button>
            </div>
          ))}
        </div>

        <div className="tier-benefits">
          <h3>{tier} Benefits</h3>
          {tiers.find(t => t.name === tier)?.benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">✓ {benefit}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;