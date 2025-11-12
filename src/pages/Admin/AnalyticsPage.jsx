import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AnalyticsPage.css';

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState({});
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get(`/analytics?range=${timeRange}`);
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, [timeRange]); // ✅ timeRange is the only dependency

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Business Analytics</h1>
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="quarter">Last Quarter</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="analytics-grid">
        <div className="metric-card">
          <h3>New Shops</h3>
          <div className="metric-value">{analytics.newShops ?? 0}</div>
        </div>
        <div className="metric-card">
          <h3>Revenue</h3>
          <div className="metric-value">${analytics.revenue ?? 0}</div>
        </div>
        <div className="metric-card">
          <h3>Active Users</h3>
          <div className="metric-value">{analytics.activeUsers ?? 0}</div>
        </div>
        <div className="metric-card">
          <h3>Conversion Rate</h3>
          <div className="metric-value">{analytics.conversionRate ?? 0}%</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
