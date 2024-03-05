import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <button className="btn btn-primary" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
