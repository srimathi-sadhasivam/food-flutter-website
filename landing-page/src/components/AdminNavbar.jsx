import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminNavbar = () => {
  const navigate = useNavigate();
  const { adminLogout } = useAuth();

  const handleLogout = () => {
    adminLogout();
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', gap: 16, padding: 12, borderBottom: '1px solid #eee' }}>
      <Link to="/admin">Dashboard</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/users">Users</Link>
      <button onClick={handleLogout} style={{ marginLeft: 'auto' }}>Logout</button>
    </nav>
  );
};

export default AdminNavbar;


