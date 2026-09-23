import React from 'react';
import './MenuHighlights.css';

const MenuHighlights = () => {
  const items = [
    {
      title: "Signature Karak",
      description: "Rich, creamy, and slow-brewed with our secret 11-spice masala blend.",
      price: "₹120",
      tag: "Best Seller"
    },
    {
      title: "Saffron Elixir",
      description: "Premium black tea infused with real Kashmiri saffron strands.",
      price: "₹180",
      tag: "Premium"
    },
    {
      title: "Podi Idli & Chai",
      description: "The classic Telugu comfort combo. Mini idlis tossed in spicy podi.",
      price: "₹210",
      tag: "Combo"
    }
  ];

  return (
    <section className="menu-highlights">
      <div className="container">
        <div className="menu-header">
          <h2 className="menu-title">
            Our<br/>
            Menu Highlights 🍃
          </h2>
          <p className="menu-subtitle">
            Carefully crafted blends for every mood and moment. Experience the true taste of tradition.
          </p>
        </div>

        <div className="menu-grid">
          {items.map((item, index) => (
            <div className="menu-card" key={index}>
              <div className="menu-card-tag">{item.tag}</div>
              <div className="menu-card-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="menu-card-footer">
                  <span className="price">{item.price}</span>
                  <button className="add-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuHighlights;
