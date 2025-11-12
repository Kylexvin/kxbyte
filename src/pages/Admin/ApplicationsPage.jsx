import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ApplicationsPage.css';

const ApplicationsPage = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [approving, setApproving] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      const response = await axios.get('/applications/admin/applications');
      // Handle both response formats
      if (response.data.applications) {
        setApplications(response.data.applications);
      } else {
        setApplications(response.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      alert('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const approveApplication = async (appId) => {
    setApproving(true);
    try {
      const response = await axios.post(`/applications/admin/applications/${appId}/approve`);
      const { tempPassword, userId, shopId } = response.data;
      
      alert(`✅ Application approved successfully!\n\nTemporary Password: ${tempPassword}\nUser ID: ${userId}\nShop ID: ${shopId}\n\nPlease provide the temporary password to the shop owner.`);
      
      fetchApplications();
      setShowApproveModal(false);
      setSelectedApp(null);
    } catch (error) {
      console.error('Error approving application:', error);
      const errorMessage = error.response?.data?.message || 'Failed to approve application. Please try again.';
      alert(errorMessage);
    } finally {
      setApproving(false);
    }
  };

  const rejectApplication = async (appId) => {
    if (window.confirm('Are you sure you want to reject this application?')) {
      try {
        await axios.post(`/applications/admin/applications/${appId}/reject`);
        alert('Application rejected successfully');
        fetchApplications();
      } catch (error) {
        console.error('Error rejecting application:', error);
        alert('Failed to reject application');
      }
    }
  };

  const openApproveModal = (application) => {
    setSelectedApp(application);
    setShowApproveModal(true);
  };

  // Filter applications based on status
  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  // Count applications by status
  const statusCounts = {
    all: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    approved: applications.filter(app => app.status === 'approved').length,
    rejected: applications.filter(app => app.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="applications-page loading">
        <div className="loading-spinner">Loading applications...</div>
      </div>
    );
  }

  return (
    <div className="applications-page">
      {/* Header */}
      <header className="applications-header">
        <div className="header-content">
          <div className="header-left">
            <button onClick={() => navigate('/admin')} className="back-btn">
              ← Back to Dashboard
            </button>
            <h1>Applications Management</h1>
          </div>
          <div className="header-actions">
            <button onClick={fetchApplications} className="refresh-btn">
              🔄 Refresh
            </button>
          </div>
        </div>
      </header>

      {/* Statistics Bar */}
      <div className="applications-stats">
        <div className="stat-item">
          <div className="stat-number">{statusCounts.all}</div>
          <div className="stat-label">Total Applications</div>
        </div>
        <div className="stat-item pending">
          <div className="stat-number">{statusCounts.pending}</div>
          <div className="stat-label">Pending Review</div>
        </div>
        <div className="stat-item approved">
          <div className="stat-number">{statusCounts.approved}</div>
          <div className="stat-label">Approved</div>
        </div>
        <div className="stat-item rejected">
          <div className="stat-number">{statusCounts.rejected}</div>
          <div className="stat-label">Rejected</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({statusCounts.all})
        </button>
        <button 
          className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({statusCounts.pending})
        </button>
        <button 
          className={`filter-tab ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved ({statusCounts.approved})
        </button>
        <button 
          className={`filter-tab ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected ({statusCounts.rejected})
        </button>
      </div>

      {/* Applications Grid */}
      <main className="applications-main">
        {filteredApplications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No applications found</h3>
            <p>
              {filter === 'all' 
                ? "There are no applications to display." 
                : `There are no ${filter} applications.`}
            </p>
          </div>
        ) : (
          <div className="applications-grid">
            {filteredApplications.map(application => (
              <ApplicationCard 
                key={application._id} 
                application={application}
                onApprove={openApproveModal}
                onReject={rejectApplication}
              />
            ))}
          </div>
        )}
      </main>

      {/* Approve Confirmation Modal */}
      {showApproveModal && selectedApp && (
        <ApproveModal
          application={selectedApp}
          onClose={() => {
            setShowApproveModal(false);
            setSelectedApp(null);
          }}
          onApprove={approveApplication}
          approving={approving}
        />
      )}
    </div>
  );
};

// Application Card Component (keep the same as before)
const ApplicationCard = ({ application, onApprove, onReject }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Pending Review', class: 'pending' },
      approved: { label: 'Approved', class: 'approved' },
      rejected: { label: 'Rejected', class: 'rejected' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  return (
    <div className="application-card">
      <div className="card-header">
        <h3>{application.businessName}</h3>
        {getStatusBadge(application.status)}
      </div>
      
      <div className="card-content">
        <div className="applicant-info">
          <div className="info-item">
            <span className="label">Owner:</span>
            <span className="value">{application.ownerName}</span>
          </div>
          <div className="info-item">
            <span className="label">Email:</span>
            <span className="value">{application.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone:</span>
            <span className="value">{application.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Applied:</span>
            <span className="value">{getTimeAgo(application.createdAt)}</span>
          </div>
        </div>
        
        {application.notes && (
          <div className="application-notes">
            <strong>Additional Notes:</strong>
            <p>{application.notes}</p>
          </div>
        )}
      </div>

      <div className="card-actions">
        {application.status === 'pending' && (
          <>
            <button 
              onClick={() => onApprove(application)}
              className="action-btn approve-btn"
            >
              ✅ Approve
            </button>
            <button 
              onClick={() => onReject(application._id)}
              className="action-btn reject-btn"
            >
              ❌ Reject
            </button>
          </>
        )}
        
        {application.status === 'approved' && (
          <div className="approved-info">
            <span className="success-text">✅ Application Approved</span>
          </div>
        )}
        
        {application.status === 'rejected' && (
          <div className="rejected-info">
            <span className="error-text">❌ Application Rejected</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Approve Confirmation Modal (keep the same as before)
const ApproveModal = ({ application, onClose, onApprove, approving }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Approve Application</h2>
          <button onClick={onClose} className="close-btn">×</button>
        </div>
        
        <div className="modal-body">
          <div className="approval-info">
            <p><strong>Business:</strong> {application.businessName}</p>
            <p><strong>Owner:</strong> {application.ownerName}</p>
            <p><strong>Email:</strong> {application.email}</p>
            <p><strong>Phone:</strong> {application.phone}</p>
          </div>
          
          <div className="approval-notice">
            <h4>⚠️ Important Notice</h4>
            <p>
              Approving this application will:
            </p>
            <ul>
              <li>Create a user account for the shop owner</li>
              <li>Create a new shop with basic subscription</li>
              <li>Generate a temporary password (will be displayed)</li>
              <li>Send activation email to the owner</li>
            </ul>
            <p className="warning-text">
              Make sure to provide the temporary password to the shop owner securely.
            </p>
          </div>
          
          <div className="modal-actions">
            <button 
              onClick={onClose}
              className="action-btn secondary"
              disabled={approving}
            >
              Cancel
            </button>
            <button 
              onClick={() => onApprove(application._id)}
              className="action-btn primary"
              disabled={approving}
            >
              {approving ? 'Approving...' : 'Confirm Approval'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;