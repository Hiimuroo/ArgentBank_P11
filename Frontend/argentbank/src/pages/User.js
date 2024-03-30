import React from 'react';
import Navbar from '../components/layout/navbar/navbar.js';
import MainContent from '../components/Contents/userHome.js';
import Footer from '../components/layout/footer/footer.js';

const UserPage = () => {
  return (
    <div className="App">
      <body>
      <Navbar />
      <MainContent />
      <Footer />
      </body>
    </div>
  );
}

export default UserPage;