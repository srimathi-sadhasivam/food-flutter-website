import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import React, { useEffect, useState } from 'react';

const AdminUsers = () => {
  const { adminToken, API_BASE_URL } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/users`, { headers: { Authorization: `Bearer ${adminToken}` } });
        const data = await res.json();
        if (data.success) setUsers(data.data);
      } catch (_) {}
    };
    if (adminToken) load();
  }, [adminToken, API_BASE_URL]);

  return (
    <AdminLayout>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>Users</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#111827', border: '1px solid #1f2937', marginTop: 12 }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Name</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Email</th>
            <th style={{ textAlign: 'left', borderBottom: '1px solid #1f2937', padding: 8 }}>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{u.name}</td>
              <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{u.email}</td>
              <td style={{ padding: 8, borderTop: '1px solid #1f2937' }}>{u.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
};

export default AdminUsers;


