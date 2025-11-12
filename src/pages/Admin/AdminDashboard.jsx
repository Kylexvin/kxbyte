import React, { useState, useEffect } from 'react';
import { useAuth } from '../../App';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

// Modern SVG Icons
const Icons = {
  Dashboard: () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Applications: () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Shops: () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  Analytics: () => (
    <svg className="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Store: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3h14a2 2 0 012 2v3.28a2 2 0 01-.586 1.414l-2 2A2 2 0 0117 12.83V20a1 1 0 01-1 1H8a1 1 0 01-1-1v-7.17a2 2 0 01-1.414-1.086l-2-2A2 2 0 013 8.28V5a2 2 0 012-2z" />
    </svg>
  ),
  Check: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Star: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeMainTab, setActiveMainTab] = useState('dashboard');
  const [shops, setShops] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [showShopModal, setShowShopModal] = useState(false);
  const [shopFilter, setShopFilter] = useState('all');

  const fetchShops = async () => {
    try {
      const response = await axios.get('/applications/admin/shops');
      setShops(response.data);
    } catch (error) {
      console.error('Error fetching shops:', error);
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
    
    if (activeMainTab === 'dashboard') {
      loadData();
    }
  }, [activeMainTab]);

  const updateShopPlan = async (shopId, plan) => {
    try {
      await axios.put(`/applications/admin/shops/${shopId}/plan`, { plan });
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
      fetchShops();
      fetchStats();
      alert(`Subscription extended by ${days} days`);
    } catch (error) {
      console.error('Error extending subscription:', error);
      alert('Failed to extend subscription');
    }
  };

  const setCustomExpiry = async (shopId, expiryDate) => {
    try {
      await axios.patch(`/applications/admin/shops/${shopId}/expiry`, { expiryDate });
      fetchShops();
      fetchStats();
      alert('Expiry date updated successfully');
    } catch (error) {
      console.error('Error setting expiry:', error);
      alert('Failed to update expiry date');
    }
  };

  const filteredShops = shops.filter(shop => {
    if (shopFilter === 'all') return true;
    if (shopFilter === 'active') return !shop.subscription.isExpired;
    if (shopFilter === 'expired') return shop.subscription.isExpired;
    if (shopFilter === 'pro') return shop.subscription.plan === 'pro';
    if (shopFilter === 'basic') return shop.subscription.plan === 'basic';
    return true;
  });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', Icon: Icons.Dashboard },
    { id: 'applications', label: 'Applications', Icon: Icons.Applications },
    { id: 'shops', label: 'Shops', Icon: Icons.Shops },
    { id: 'analytics', label: 'Analytics', Icon: Icons.Analytics },
  ];

  const handleNavigation = (tabId) => {
    setActiveMainTab(tabId);
    if (tabId === 'applications') {
      navigate('/admin/applications');
    } else if (tabId === 'shops') {
      navigate('/admin/shops');
    } else if (tabId === 'analytics') {
      navigate('/admin/analytics');
    }
  };

  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin/applications') setActiveMainTab('applications');
    else if (path === '/admin/shops') setActiveMainTab('shops');
    else if (path === '/admin/analytics') setActiveMainTab('analytics');
    else setActiveMainTab('dashboard');
  }, [location.pathname]);

  if (loading && activeMainTab === 'dashboard') {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <div className="admin-logo">
              KXBYT<span className="logo-accent">E</span>
            </div>
            <nav className="main-nav">
              {navItems.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className={`nav-item ${activeMainTab === id ? 'active' : ''}`}
                  onClick={() => handleNavigation(id)}
                >
                  <Icon />
                  {label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="admin-actions">
            <span className="welcome-text">{user?.name}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {activeMainTab === 'dashboard' && (
          <div className="dashboard-view">
            <div className="view-header">
              <h2>Dashboard</h2>
              <div className="view-actions">
                <button onClick={() => navigate('/admin/applications')} className="action-btn primary">
                  Applications
                </button>
                <button onClick={() => navigate('/admin/shops')} className="action-btn secondary">
                  Manage Shops
                </button>
              </div>
            </div>

            <div className="stats-grid">
              <StatCard
                label="Total Shops"
                value={stats.totalShops || 0}
                icon={<Icons.Store />}
              />
              <StatCard
                label="Active"
                value={stats.activeSubscriptions || 0}
                icon={<Icons.Check />}
              />
              <StatCard
                label="Expired"
                value={stats.expiredSubscriptions || 0}
                icon={<Icons.Close />}
              />
              <StatCard
                label="Pro Plans"
                value={stats.proShops || 0}
                icon={<Icons.Star />}
              />
              <StatCard
                label="Basic Plans"
                value={stats.basicShops || 0}
                icon={<Icons.Store />}
              />
              <StatCard
                label="Expiring Soon"
                value={stats.expiringSoon || 0}
                icon={<Icons.Clock />}
              />
            </div>

            <div className="shops-section">
              <div className="section-header">
                <h3>Recent Shops</h3>
                <div className="filter-tabs">
                  {['all', 'active', 'expired', 'pro', 'basic'].map(filter => (
                    <button
                      key={filter}
                      className={`filter-tab ${shopFilter === filter ? 'active' : ''}`}
                      onClick={() => setShopFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      {filter === 'all' && ` (${shops.length})`}
                      {filter === 'active' && ` (${stats.activeSubscriptions || 0})`}
                      {filter === 'expired' && ` (${stats.expiredSubscriptions || 0})`}
                      {filter === 'pro' && ` (${stats.proShops || 0})`}
                      {filter === 'basic' && ` (${stats.basicShops || 0})`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="shops-grid">
                {filteredShops.slice(0, 6).map(shop => (
                  <ShopCard
                    key={shop._id}
                    shop={shop}
                    onManage={() => {
                      setSelectedShop(shop);
                      setShowShopModal(true);
                    }}
                    onUpdatePlan={updateShopPlan}
                  />
                ))}
              </div>

              {filteredShops.length > 6 && (
                <div className="view-all-section">
                  <p>Showing 6 of {filteredShops.length} shops</p>
                  <button onClick={() => navigate('/admin/shops')} className="view-all-btn">
                    View All Shops →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeMainTab !== 'dashboard' && activeMainTab !== 'shops' && activeMainTab !== 'applications' && activeMainTab !== 'analytics' && (
          <div className="coming-soon-view">
            <div className="coming-soon-content">
              <div className="coming-soon-icon">🚧</div>
              <h2>Coming Soon</h2>
              <p>This section is under development.</p>
              <button onClick={() => setActiveMainTab('dashboard')} className="back-to-dashboard">
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </main>

      {showShopModal && selectedShop && (
        <ShopManagementModal
          shop={selectedShop}
          onClose={() => {
            setShowShopModal(false);
            setSelectedShop(null);
          }}
          onExtend={extendSubscription}
          onSetExpiry={setCustomExpiry}
        />
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ label, value, icon }) => (
  <div className="stat-card">
    <div className="stat-header">
      <span className="stat-label">{label}</span>
      <div className="stat-icon">{icon}</div>
    </div>
    <div className="stat-value">{value}</div>
  </div>
);

// Shop Card Component
const ShopCard = ({ shop, onManage, onUpdatePlan }) => (
  <div className="shop-card">
    <div className="shop-header">
      <h3>{shop.name}</h3>
      <span className={`plan-badge ${shop.subscription.plan}`}>
        {shop.subscription.plan}
      </span>
    </div>
    
    <div className="shop-details">
      <div className="detail-row">
        <span className="detail-label">Owner</span>
        <span className="detail-value">{shop.owner?.name}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Email</span>
        <span className="detail-value">{shop.owner?.email}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Phone</span>
        <span className="detail-value">{shop.owner?.phone}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">Status</span>
        <span className={`status-badge ${shop.owner?.status}`}>
          {shop.owner?.status}
        </span>
      </div>
    </div>

    <div className="subscription-info">
      <div className="subscription-row">
        <span className="label">Expires</span>
        <span className="value">{new Date(shop.subscription.expiresAt).toLocaleDateString()}</span>
      </div>
      <div className="subscription-row">
        <span className="label">Status</span>
        <span className={`expiry-badge ${shop.subscription.isExpired ? 'expired' : 'active'}`}>
          {shop.subscription.isExpired ? 'Expired' : 'Active'}
        </span>
      </div>
      {!shop.subscription.isExpired && shop.subscription.daysRemaining && (
        <div className="subscription-row">
          <span className="label">Days Left</span>
          <span className="value">{shop.subscription.daysRemaining}</span>
        </div>
      )}
    </div>

    <div className="shop-actions">
      <button onClick={onManage} className="action-btn manage">
        Manage
      </button>
      <button 
        onClick={() => onUpdatePlan(shop._id, shop.subscription.plan === 'pro' ? 'basic' : 'pro')}
        className="action-btn plan"
      >
        → {shop.subscription.plan === 'pro' ? 'Basic' : 'Pro'}
      </button>
    </div>
  </div>
);

// Shop Management Modal
const ShopManagementModal = ({ shop, onClose, onExtend, onSetExpiry }) => {
  const [extendDays, setExtendDays] = useState(30);
  const [customExpiry, setCustomExpiry] = useState('');

  const handleExtend = () => {
    onExtend(shop._id, extendDays);
    onClose();
  };

  const handleSetExpiry = () => {
    onSetExpiry(shop._id, customExpiry);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{shop.name}</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>

        <div className="modal-body">
          <div className="shop-info">
            <div className="info-row">
              <span className="label">Owner</span>
              <span className="value">{shop.owner?.name}</span>
            </div>
            <div className="info-row">
              <span className="label">Plan</span>
              <span className="value">{shop.subscription.plan}</span>
            </div>
            <div className="info-row">
              <span className="label">Expires</span>
              <span className="value">{new Date(shop.subscription.expiresAt).toLocaleDateString()}</span>
            </div>
            <div className="info-row">
              <span className="label">Status</span>
              <span className={`status-badge ${shop.subscription.isExpired ? 'expired' : 'active'}`}>
                {shop.subscription.isExpired ? 'Expired' : 'Active'}
              </span>
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
                placeholder="Days"
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
                Set Date
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;