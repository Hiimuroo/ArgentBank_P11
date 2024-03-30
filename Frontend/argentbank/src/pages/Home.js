import React from 'react';
import Navbar from '../components/layout/navbar/navbar.js';
import Hero from '../components/hero/hero.js';
import Features from '../components/features/features.js';
import Footer from '../components/layout/footer/footer.js';


const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;