import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0b0f14', color: '#e5e7eb' }}>
      <aside style={{ width: 240, background: '#0f1720', borderRight: '1px solid #1f2937', padding: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16, color: '#f59e0b' }}>WellFood Admin</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Link to="/admin" style={{ color: '#e5e7eb' }}>Dashboard</Link>
          <Link to="/admin/orders" style={{ color: '#e5e7eb' }}>Orders</Link>
          <Link to="/admin/users" style={{ color: '#e5e7eb' }}>Users</Link>
        </nav>
      </aside>
      <main style={{ flex: 1 }}>
        <header style={{ padding: 16, borderBottom: '1px solid #1f2937', background: '#0f1720', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontWeight: 600, flex: 1 }}>Admin Panel</div>
          <button
            onClick={() => window.location.assign('/')}
            style={{
              border: '1px solid #374151',
              background: '#111827',
              color: '#e5e7eb',
              padding: '8px 12px',
              borderRadius: 8,
              cursor: 'pointer'
            }}
          >
            ← Back to Home
          </button>
        </header>
        <div style={{ padding: 16 }}>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;


