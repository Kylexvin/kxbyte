import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShopManagement.css';

const ShopManagement = () => {
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({});

  // Fetch shops and stats
  const fetchShops = async () => {
    try {
      const response = await axios.get('/applications/admin/shops');
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
      alert('Failed to load shops');
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/applications/admin/subscription-stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchShops(), fetchStats()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Shop actions
  const updateShopPlan = async (shopId, plan) => {
    try {
      await axios.put(`/applications/admin/shops/${shopId}/plan`, { plan });
      alert(`Shop plan updated to ${plan}`);
      fetchShops();
      fetchStats();
    } catch (error) {
      console.error('Error updating plan:', error);
      alert('Failed to update plan');
    }
  };

  const extendSubscription = async (shopId, days) => {
    try {
      await axios.patch(`/applications/admin/shops/${shopId}/extend`, { days });
      alert(`Subscription extended by ${days} days`);
      fetchShops();
      fetchStats();
    } catch (error) {
      console.error('Error extending subscription:', error);
      alert('Failed to extend subscription');
    }
  };

  const setCustomExpiry = async (shopId, expiryDate) => {
    try {
      await axios.patch(`/applications/admin/shops/${shopId}/expiry`, { expiryDate });
      alert('Expiry date updated successfully');
      fetchShops();
      fetchStats();
    } catch (error) {
      console.error('Error setting expiry:', error);
      alert('Failed to update expiry date');
    }
  };

  const suspendShop = async (shopId) => {
    if (window.confirm('Are you sure you want to suspend this shop? The owner will not be able to access their account.')) {
      try {
        // You'll need to implement this endpoint
        await axios.patch(`/applications/admin/shops/${shopId}/suspend`);
        alert('Shop suspended successfully');
        fetchShops();
      } catch (error) {
        console.error('Error suspending shop:', error);
        alert('Failed to suspend shop');
      }
    }
  };

  const activateShop = async (shopId) => {
    try {
      // You'll need to implement this endpoint
      await axios.patch(`/applications/admin/shops/${shopId}/activate`);
      alert('Shop activated successfully');
      fetchShops();
    } catch (error) {
      console.error('Error activating shop:', error);
      alert('Failed to activate shop');
    }
  };

  const createShop = async (shopData) => {
    try {
      // You'll need to implement this endpoint
      await axios.post('/applications/admin/shops/create', shopData);
      alert('Shop created successfully');
      setShowCreateModal(false);
      fetchShops();
      fetchStats();
    } catch (error) {
      console.error('Error creating shop:', error);
      alert('Failed to create shop');
    }
  };

  // Filter and search
  const filteredShops = shops.filter(shop => {
    // Status filter
    if (filter === 'active' && shop.subscription.isExpired) return false;
    if (filter === 'expired' && !shop.subscription.isExpired) return false;
    if (filter === 'pro' && shop.subscription.plan !== 'pro') return false;
    if (filter === 'basic' && shop.subscription.plan !== 'basic') return false;
    if (filter === 'suspended' && shop.owner?.status !== 'suspended') return false;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        shop.name.toLowerCase().includes(term) ||
        shop.owner?.name.toLowerCase().includes(term) ||
        shop.owner?.email.toLowerCase().includes(term) ||
        shop.owner?.phone.includes(term)
      );
    }

    return true;
  });

  // Status counts
  const statusCounts = {
    all: shops.length,
    active: shops.filter(shop => !shop.subscription.isExpired).length,
    expired: shops.filter(shop => shop.subscription.isExpired).length,
    pro: shops.filter(shop => shop.subscription.plan === 'pro').length,
    basic: shops.filter(shop => shop.subscription.plan === 'basic').length,
    suspended: shops.filter(shop => shop.owner?.status === 'suspended').length,
  };

  if (loading) {
    return (
      <div className="shop-management loading">
        <div className="loading-spinner">Loading shops...</div>
      </div>
    );
  }

  return (
    <div className="shop-management">
      {/* Header */}
      <header className="shop-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => navigate('/admin')} className="back-btn">
              ← Back to Dashboard
            </button>
            <h1>Shop Management</h1>
          </div>
          <div className="header-actions">
            <button 
              onClick={() => setShowCreateModal(true)}
              className="create-btn"
            >
              ➕ Create New Shop
            </button>
            <button onClick={() => { fetchShops(); fetchStats(); }} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Statistics */}
      <div className="shop-stats">
        <div className="stat-item">
          <div className="stat-number">{stats.totalShops || 0}</div>
          <div className="stat-label">Total Shops</div>
        </div>
        <div className="stat-item active">
          <div className="stat-number">{stats.activeSubscriptions || 0}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-item expired">
          <div className="stat-number">{stats.expiredSubscriptions || 0}</div>
          <div className="stat-label">Expired</div>
        </div>
        <div className="stat-item pro">
          <div className="stat-number">{stats.proShops || 0}</div>
          <div className="stat-label">Pro Plans</div>
        </div>
        <div className="stat-item basic">
          <div className="stat-number">{stats.basicShops || 0}</div>
          <div className="stat-label">Basic Plans</div>
        </div>
        <div className="stat-item expiring">
          <div className="stat-number">{stats.expiringSoon || 0}</div>
          <div className="stat-label">Expiring Soon</div>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search shops by name, owner, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-tabs">
          {['all', 'active', 'expired', 'pro', 'basic', 'suspended'].map(status => (
            <button
              key={status}
              className={`filter-tab ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              {status !== 'all' && ` (${statusCounts[status]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Shops Grid */}
      <main className="shops-main">
        {filteredShops.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <h3>No shops found</h3>
            <p>
              {searchTerm 
                ? `No shops match your search for "${searchTerm}"`
                : `There are no ${filter === 'all' ? '' : filter + ' '}shops.`
              }
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="clear-search-btn"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="shops-grid">
            {filteredShops.map(shop => (
              <ShopCard
                key={shop._id}
                shop={shop}
                onManage={() => {
                  setSelectedShop(shop);
                  setShowShopModal(true);
                }}
                onUpdatePlan={updateShopPlan}
                onSuspend={suspendShop}
                onActivate={activateShop}
              />
            ))}
          </div>
        )}
      </main>

      {/* Shop Management Modal */}
      {showShopModal && selectedShop && (
        <ShopManagementModal
          shop={selectedShop}
          onClose={() => {
            setShowShopModal(false);
            setSelectedShop(null);
          }}
          onExtend={extendSubscription}
          onSetExpiry={setCustomExpiry}
          onUpdatePlan={updateShopPlan}
        />
      )}

      {/* Create Shop Modal */}
      {showCreateModal && (
        <CreateShopModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createShop}
        />
      )}
    </div>
  );
};

// Shop Card Component
const ShopCard = ({ shop, onManage, onUpdatePlan, onSuspend, onActivate }) => {
  const getDaysRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const isSuspended = shop.owner?.status === 'suspended';

  return (
    <div className={`shop-card ${isSuspended ? 'suspended' : ''}`}>
      <div className="card-header">
        <div className="shop-title">
          <h3>{shop.name}</h3>
          {isSuspended && <span className="suspended-badge">SUSPENDED</span>}
        </div>
        <div className="plan-badge-container">
          <span className={`plan-badge ${shop.subscription.plan}`}>
            {shop.subscription.plan.toUpperCase()}
          </span>
          <span className={`status-badge ${shop.subscription.isExpired ? 'expired' : 'active'}`}>
            {shop.subscription.isExpired ? 'EXPIRED' : 'ACTIVE'}
          </span>
        </div>
      </div>

      <div className="card-content">
        <div className="owner-info">
          <h4>Owner Information</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{shop.owner?.name || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{shop.owner?.email || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="label">Phone:</span>
              <span className="value">{shop.owner?.phone || 'N/A'}</span>
            </div>
            <div className="info-item">
              <span className="label">Status:</span>
              <span className={`value status ${shop.owner?.status || 'active'}`}>
                {shop.owner?.status || 'Active'}
              </span>
            </div>
          </div>
        </div>

        <div className="subscription-info">
          <h4>Subscription</h4>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Expires:</span>
              <span className="value">
                {new Date(shop.subscription.expiresAt).toLocaleDateString()}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Days Left:</span>
              <span className={`value ${getDaysRemaining(shop.subscription.expiresAt) <= 7 ? 'warning' : ''}`}>
                {getDaysRemaining(shop.subscription.expiresAt)}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Created:</span>
              <span className="value">
                {new Date(shop.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="card-actions">
        <button onClick={onManage} className="action-btn manage">
          ⚙️ Manage
        </button>
        <button 
          onClick={() => onUpdatePlan(shop._id, shop.subscription.plan === 'pro' ? 'basic' : 'pro')}
          className="action-btn plan"
        >
          {shop.subscription.plan === 'pro' ? '⬇️ Basic' : '⬆️ Pro'}
        </button>
        {isSuspended ? (
          <button 
            onClick={() => onActivate(shop._id)}
            className="action-btn activate"
          >
            ✅ Activate
          </button>
        ) : (
          <button 
            onClick={() => onSuspend(shop._id)}
            className="action-btn suspend"
          >
            ⚠️ Suspend
          </button>
        )}
      </div>
    </div>
  );
};

// Shop Management Modal Component
const ShopManagementModal = ({ shop, onClose, onExtend, onSetExpiry, onUpdatePlan }) => {
  const [extendDays, setExtendDays] = useState(30);
  const [customExpiry, setCustomExpiry] = useState('');
  const [activeTab, setActiveTab] = useState('subscription');

  const handleExtend = () => {
    onExtend(shop._id, extendDays);
  };

  const handleSetExpiry = () => {
    onSetExpiry(shop._id, customExpiry);
  };

  const getDaysRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content large">
        <div className="modal-header">
          <h2>Manage {shop.name}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="modal-tabs">
          <button 
            className={`modal-tab ${activeTab === 'subscription' ? 'active' : ''}`}
            onClick={() => setActiveTab('subscription')}
          >
            📅 Subscription
          </button>
          <button 
            className={`modal-tab ${activeTab === 'owner' ? 'active' : ''}`}
            onClick={() => setActiveTab('owner')}
          >
            👤 Owner Info
          </button>
          <button 
            className={`modal-tab ${activeTab === 'actions' ? 'active' : ''}`}
            onClick={() => setActiveTab('actions')}
          >
            ⚡ Quick Actions
          </button>
        </div>

        <div className="modal-body">
          {activeTab === 'subscription' && (
            <div className="tab-content">
              <div className="current-subscription">
                <h3>Current Subscription</h3>
                <div className="subscription-details">
                  <p><strong>Plan:</strong> 
                    <span className={`plan-badge ${shop.subscription.plan}`}>
                      {shop.subscription.plan.toUpperCase()}
                    </span>
                  </p>
                  <p><strong>Expiry Date:</strong> {new Date(shop.subscription.expiresAt).toLocaleDateString()}</p>
                  <p><strong>Days Remaining:</strong> 
                    <span className={getDaysRemaining(shop.subscription.expiresAt) <= 7 ? 'warning' : 'success'}>
                      {getDaysRemaining(shop.subscription.expiresAt)} days
                    </span>
                  </p>
                  <p><strong>Status:</strong> 
                    <span className={`status ${shop.subscription.isExpired ? 'expired' : 'active'}`}>
                      {shop.subscription.isExpired ? 'Expired' : 'Active'}
                    </span>
                  </p>
                </div>
              </div>

              <div className="action-section">
                <h3>Extend Subscription</h3>
                <div className="input-group">
                  <input
                    type="number"
                    value={extendDays}
                    onChange={(e) => setExtendDays(parseInt(e.target.value))}
                    min="1"
                    placeholder="Number of days"
                  />
                  <button onClick={handleExtend} className="action-btn extend">
                    Extend
                  </button>
                </div>
              </div>

              <div className="action-section">
                <h3>Set Custom Expiry</h3>
                <div className="input-group">
                  <input
                    type="date"
                    value={customExpiry}
                    onChange={(e) => setCustomExpiry(e.target.value)}
                  />
                  <button onClick={handleSetExpiry} className="action-btn custom">
                    Set Expiry
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'owner' && (
            <div className="tab-content">
              <div className="owner-details">
                <h3>Owner Information</h3>
                <div className="details-grid">
                  <div className="detail-item">
                    <label>Name:</label>
                    <span>{shop.owner?.name || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Email:</label>
                    <span>{shop.owner?.email || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phone:</label>
                    <span>{shop.owner?.phone || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Status:</label>
                    <span className={`status ${shop.owner?.status}`}>
                      {shop.owner?.status || 'Active'}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>User ID:</label>
                    <span className="monospace">{shop.owner?._id || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Shop Created:</label>
                    <span>{new Date(shop.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'actions' && (
            <div className="tab-content">
              <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button 
                    onClick={() => onUpdatePlan(shop._id, shop.subscription.plan === 'pro' ? 'basic' : 'pro')}
                    className="quick-action-btn plan"
                  >
                    <span className="icon">🔄</span>
                    <span>Switch to {shop.subscription.plan === 'pro' ? 'Basic' : 'Pro'}</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setExtendDays(30);
                      handleExtend();
                    }}
                    className="quick-action-btn extend"
                  >
                    <span className="icon">📅</span>
                    <span>Extend 30 Days</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setExtendDays(90);
                      handleExtend();
                    }}
                    className="quick-action-btn extend"
                  >
                    <span className="icon">📅</span>
                    <span>Extend 90 Days</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      const nextYear = new Date();
                      nextYear.setFullYear(nextYear.getFullYear() + 1);
                      setCustomExpiry(nextYear.toISOString().split('T')[0]);
                      handleSetExpiry();
                    }}
                    className="quick-action-btn custom"
                  >
                    <span className="icon">🎯</span>
                    <span>Set 1 Year Expiry</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Create Shop Modal Component
const CreateShopModal = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    plan: 'basic',
    subscriptionDays: 30
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Create New Shop</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="create-form">
            <div className="form-group">
              <label>Business Name *</label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                placeholder="Enter business name"
              />
            </div>

            <div className="form-group">
              <label>Owner Name *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                placeholder="Enter owner's full name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter owner's email"
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter owner's phone number"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Subscription Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                >
                  <option value="basic">Basic</option>
                  <option value="pro">Pro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subscription Days</label>
                <input
                  type="number"
                  name="subscriptionDays"
                  value={formData.subscriptionDays}
                  onChange={handleChange}
                  min="1"
                  placeholder="30"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={onClose} className="action-btn secondary">
                Cancel
              </button>
              <button type="submit" className="action-btn primary">
                Create Shop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopManagement;