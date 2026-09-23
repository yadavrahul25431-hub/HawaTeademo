import React from 'react';
import './Ambiance.css';

const Ambiance = () => {
  return (
    <section className="ambiance container">
      <div className="ambiance-grid">
        <div className="ambiance-card text-card">
          <h2 className="ambiance-title">
            Smooth.<br/>
            Clean.<br/>
            Alive.
          </h2>
          <p>
            Experience the soulful tranquility of our village-themed cafe. A perfect balance of authentic Telugu food and premium tea blends.
          </p>
          <button className="pill-btn pill-btn-outline" style={{ marginTop: '2rem' }}>
            Visit Us
          </button>
        </div>
        
        <div className="ambiance-card feature-card dark-feature">
          <div className="feature-content">
            <h3>Morning Rituals</h3>
            <p>Start your day with our Saffron Elixir and fresh Pesarattu.</p>
          </div>
        </div>

        <div className="ambiance-card feature-card light-feature">
          <div className="feature-content">
            <h3>Evening Unwind</h3>
            <p>Relax under the canopy with classic Punugulu and Karak Chai.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ambiance;
