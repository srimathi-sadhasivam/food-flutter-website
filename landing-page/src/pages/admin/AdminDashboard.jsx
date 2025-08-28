import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { adminToken, API_BASE_URL } = useAuth();
  const [summary, setSummary] = useState({
    totals: { totalOrders: 0, pendingOrders: 0, shippedOrders: 0, deliveredOrders: 0, usersCount: 0 },
    revenue: 0,
    recentOrders: []
  });

  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/summary`, {
          headers: { Authorization: `Bearer ${adminToken}` }
        });
        const data = await res.json();
        if (isMounted && data.success) setSummary(data.data);
      } catch (_) {}
    };
    if (adminToken) fetchSummary();
    return () => { isMounted = false; };
  }, [adminToken, API_BASE_URL]);

  return (
    <AdminLayout>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16, marginTop: 16 }}>
        <div style={{ padding: 16, border: '1px solid #1f2937', borderRadius: 8, background: '#111827' }}>
          <div>Total Orders</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#e5e7eb' }}>{summary.totals.totalOrders}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #1f2937', borderRadius: 8, background: '#111827' }}>
          <div>Revenue</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#e5e7eb' }}>₹{summary.revenue}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #1f2937', borderRadius: 8, background: '#111827' }}>
          <div>Users</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#e5e7eb' }}>{summary.totals.usersCount}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #1f2937', borderRadius: 8, background: '#111827' }}>
          <div>Pending</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: '#e5e7eb' }}>{summary.totals.pendingOrders}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16, marginTop: 16 }}>
        <div style={{ padding: 16, border: '1px solid #1f2937', borderRadius: 8, background: '#111827' }}>
          <div>Shipped</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb' }}>{summary.totals.shippedOrders}</div>
        </div>
        <div style={{ padding: 16, border: '1px solid #1f2937', borderRadius: 8, background: '#111827' }}>
          <div>Delivered</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#e5e7eb' }}>{summary.totals.deliveredOrders}</div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#f59e0b', marginBottom: 8 }}>Recent Orders</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#111827', border: '1px solid #1f2937' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Date</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>User</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Total</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {summary.recentOrders.map((o) => (
              <tr key={o._id}>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{new Date(o.placedAt).toLocaleString()}</td>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{o.userName} ({o.userEmail})</td>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>₹{o.totalAmount}</td>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;


