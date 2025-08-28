import React, { useEffect, useMemo, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const AdminOrders = () => {
  const { adminToken, API_BASE_URL } = useAuth();
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const limit = 20;

  const query = useMemo(() => {
    const p = new URLSearchParams();
    if (q) p.set('q', q);
    if (status) p.set('status', status);
    if (startDate) p.set('startDate', startDate);
    if (endDate) p.set('endDate', endDate);
    p.set('page', String(page));
    p.set('limit', String(limit));
    return p.toString();
  }, [q, status, startDate, endDate, page]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`${API_BASE_URL}/admin/orders?${query}`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data.orders);
        setTotal(data.data.total);
      }
    };
    if (adminToken) fetchOrders();
  }, [adminToken, API_BASE_URL, query]);

  const updateStatus = async (orderId, newStatus) => {
    const res = await fetch(`${API_BASE_URL}/admin/update-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminToken}` },
      body: JSON.stringify({ orderId, status: newStatus })
    });
    const data = await res.json();
    if (data.success) {
      setOrders((prev) => prev.map((o) => (o._id === orderId ? data.data : o)));
    }
  };

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <AdminLayout>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>Orders</h2>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, marginTop: 12 }}>
          <input placeholder="Search by user" value={q} onChange={(e) => setQ(e.target.value)} />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          <button onClick={() => setPage(1)}>Apply</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#111827', border: '1px solid #1f2937' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Date</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>User</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Items</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Total</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{new Date(o.placedAt).toLocaleString()}</td>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{o.userName} ({o.userEmail})</td>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{o.items.map(i => `${i.name} x${i.quantity}`).join(', ')}</td>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>₹{o.totalAmount}</td>
                <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>
                  <select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                    <option>Pending</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
        </div>
    </AdminLayout>
  );
};

export default AdminOrders;


