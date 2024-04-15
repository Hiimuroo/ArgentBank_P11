import React from 'react';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/layout/navbar/navbar.js';
import MainContent from '../components/Contents/userHome.js';
import Footer from '../components/layout/footer/footer.js';

const UserPage = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="App">
      <Navbar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default UserPage;