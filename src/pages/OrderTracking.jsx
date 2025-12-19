import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './OrderTracking.css';

const OrderTracking = () => {
  const { user } = useAuth();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [viewingDetails, setViewingDetails] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const token = localStorage.getItem('aura-token');
      if (!token) {
        setUserOrders([]);
        return;
      }
      
      const response = await fetch('http://localhost:5000/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const formattedOrders = data.orders.map(order => ({
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          total: order.totalAmount,
          status: order.status,
          items: order.items.map(item => item.product?.name || 'Product'),
          tracking: `TRK${order._id.slice(-8).toUpperCase()}`,
          timeline: [
            { status: order.status, date: new Date(order.createdAt).toLocaleDateString(), time: new Date(order.createdAt).toLocaleTimeString(), completed: true }
          ]
        }));
        setUserOrders(formattedOrders);
      } else {
        setUserOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setUserOrders([]);
    }
  };



  const trackOrder = () => {
    const order = userOrders.find(o => o.tracking === trackingNumber);
    setSelectedOrder(order || null);
    if (!order) {
      alert('Order not found. Please check your tracking number.');
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      ordered: '📋',
      processing: '⚙️',
      shipped: '🚚',
      delivered: '📦',
      cancelled: '❌'
    };
    return icons[status] || '❓';
  };

  const initiateReturn = (orderId) => {
    alert(`Return initiated for order ${orderId}. You will receive return instructions via email.`);
  };

  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setUserOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { 
                ...order, 
                status: 'cancelled',
                timeline: [
                  { status: 'cancelled', date: new Date().toLocaleDateString(), time: new Date().toLocaleTimeString(), completed: true }
                ]
              }
            : order
        )
      );
      alert('Order cancelled successfully!');
    }
  };

  const viewOrderDetails = (order) => {
    setViewingDetails(order);
  };

  const closeDetails = () => {
    setViewingDetails(null);
  };

  if (!user) {
    return (
      <div className="container tracking-page">
        <div className="tracking-header">
          <h1>Order Tracking</h1>
        </div>
        
        <div className="guest-tracking">
          <h3>Track Your Order</h3>
          <div className="tracking-input">
            <input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button onClick={trackOrder} className="track-btn">Track Order</button>
          </div>
        </div>

        {selectedOrder && (
          <div className="order-details">
            <h3>Order Details</h3>
            <div className="order-info">
              <p><strong>Order ID:</strong> {selectedOrder.id}</p>
              <p><strong>Status:</strong> {selectedOrder.status}</p>
              <p><strong>Total:</strong> ₹{selectedOrder.total}</p>
            </div>
            <div className="tracking-timeline">
              {selectedOrder.timeline.map((step, index) => (
                <div key={index} className={`timeline-step ${step.completed ? 'completed' : 'pending'}`}>
                  <div className="step-icon">{getStatusIcon(step.status)}</div>
                  <div className="step-info">
                    <h4>{step.status.charAt(0).toUpperCase() + step.status.slice(1)}</h4>
                    <p>{step.date} at {step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="return-policy">
          <h3>Return Policy</h3>
          <div className="policy-content">
            <p>• 30-day return window from delivery date</p>
            <p>• Items must be unopened and in original packaging</p>
            <p>• Free returns on orders over ₹4000</p>
            <p>• Refunds processed within 5-7 business days</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container tracking-page">
      <div className="tracking-header">
        <h1>My Orders</h1>
      </div>

      <div className="orders-list">
        {userOrders.length === 0 ? (
          <div className="no-orders">
            <h3>No Orders Found</h3>
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          userOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-summary">
              <div className="order-basic">
                <h3>{order.id}</h3>
                <p>Ordered on {order.date}</p>
                <p className="order-total">₹{order.total}</p>
              </div>
              <div className="order-status">
                <span className={`status-badge ${order.status}`}>
                  {getStatusIcon(order.status)} {order.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="order-items">
              <strong>Items:</strong> {order.items.join(', ')}
            </div>

            <div className="tracking-timeline">
              {order.timeline.map((step, index) => (
                <div key={index} className={`timeline-step ${step.completed ? 'completed' : 'pending'}`}>
                  <div className="step-icon">{getStatusIcon(step.status)}</div>
                  <div className="step-info">
                    <h4>{step.status.charAt(0).toUpperCase() + step.status.slice(1)}</h4>
                    <p>{step.date} at {step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-actions">
              <button className="track-btn" onClick={() => viewOrderDetails(order)}>View Details</button>
              {order.status !== 'delivered' && order.status !== 'shipped' && (
                <button 
                  className="cancel-btn"
                  onClick={() => cancelOrder(order.id)}
                >
                  Cancel Order
                </button>
              )}
              {order.status === 'delivered' && (
                <button 
                  className="return-btn"
                  onClick={() => initiateReturn(order.id)}
                >
                  Return Items
                </button>
              )}
            </div>
          </div>
          ))
        )}
      </div>

      <div className="return-policy">
        <h3>Return & Refund Policy</h3>
        <div className="policy-grid">
          <div className="policy-item">
            <h4>🕒 Return Window</h4>
            <p>30 days from delivery date</p>
          </div>
          <div className="policy-item">
            <h4>📦 Condition</h4>
            <p>Unopened, original packaging</p>
          </div>
          <div className="policy-item">
            <h4>🚚 Free Returns</h4>
            <p>On orders over ₹4000</p>
          </div>
          <div className="policy-item">
            <h4>💰 Refund Time</h4>
            <p>5-7 business days</p>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {viewingDetails && (
        <div className="order-details-modal">
          <div className="modal-overlay" onClick={closeDetails}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="close-btn" onClick={closeDetails}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="order-info-section">
                <h3>Order Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <strong>Order ID:</strong> {viewingDetails.id}
                  </div>
                  <div className="info-item">
                    <strong>Order Date:</strong> {viewingDetails.date}
                  </div>
                  <div className="info-item">
                    <strong>Status:</strong> 
                    <span className={`status-badge ${viewingDetails.status}`}>
                      {getStatusIcon(viewingDetails.status)} {viewingDetails.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="info-item">
                    <strong>Total Amount:</strong> ₹{viewingDetails.total}
                  </div>
                  <div className="info-item">
                    <strong>Tracking Number:</strong> {viewingDetails.tracking}
                  </div>
                </div>
              </div>

              <div className="items-section">
                <h3>Items Ordered</h3>
                <div className="items-list">
                  {Array.isArray(viewingDetails.items) ? viewingDetails.items.map((item, index) => (
                    <div key={index} className="item-row">
                      <span className="item-name">{typeof item === 'string' ? item : item.name}</span>
                      {typeof item === 'object' && item.quantity && (
                        <span className="item-details">Qty: {item.quantity} | ₹{item.price}</span>
                      )}
                    </div>
                  )) : (
                    <div className="item-row">
                      <span className="item-name">No items found</span>
                    </div>
                  )}
                </div>
              </div>

              {viewingDetails.customerInfo && (
                <div className="customer-info-section">
                  <h3>Shipping Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>Name:</strong> {viewingDetails.customerInfo.firstName} {viewingDetails.customerInfo.lastName}
                    </div>
                    <div className="info-item">
                      <strong>Email:</strong> {viewingDetails.customerInfo.email}
                    </div>
                    <div className="info-item">
                      <strong>Address:</strong> {viewingDetails.customerInfo.address}
                    </div>
                    <div className="info-item">
                      <strong>City:</strong> {viewingDetails.customerInfo.city}, {viewingDetails.customerInfo.state} {viewingDetails.customerInfo.zipCode}
                    </div>
                  </div>
                </div>
              )}

              <div className="timeline-section">
                <h3>Order Timeline</h3>
                <div className="tracking-timeline">
                  {viewingDetails.timeline.map((step, index) => (
                    <div key={index} className={`timeline-step ${step.completed ? 'completed' : 'pending'}`}>
                      <div className="step-icon">{getStatusIcon(step.status)}</div>
                      <div className="step-info">
                        <h4>{step.status.charAt(0).toUpperCase() + step.status.slice(1)}</h4>
                        <p>{step.date} at {step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;