import React, { useState } from 'react';
import ChaiNavbar from './components/ChaiNavbar';
import NeoHero from './components/NeoHero';
import ChaiMenu from './components/ChaiMenu';
import ChaiFeatures from './components/ChaiFeatures';
import ChaiAmbience from './components/ChaiAmbience';
import DrinkCrafter from './components/DrinkCrafter';
import CartDrawer from './components/CartDrawer';
import OurRoots from './components/OurRoots';
import MerchShop from './components/MerchShop';
import ReservationModal from './components/ReservationModal';
import StaffLogin from './components/StaffLogin';
import SplashLogin from './components/SplashLogin';
import StaffDashboard from './components/StaffDashboard';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isStaffLoginOpen, setIsStaffLoginOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  // Calculate totals
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Add a new custom drink from DrinkCrafter
  const handleAddToCart = (customDrink) => {
    setCartItems(prev => [...prev, customDrink]);
    setIsCartOpen(true);
  };

  // Update quantity (used by both Menu and CartDrawer)
  const handleUpdateQuantity = (item, newQuantity) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(i => i.id === item.id);
      
      if (newQuantity <= 0) {
        // Remove item
        return prev.filter(i => i.id !== item.id);
      }

      if (existingItemIndex >= 0) {
        // Update existing
        const newCart = [...prev];
        newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newQuantity };
        return newCart;
      } else {
        // Add new (from Menu)
        return [...prev, { ...item, quantity: newQuantity }];
      }
    });
  };

  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <SplashLogin onLogin={handleLogin} />;
  }

  if (userRole === 'staff') {
    return <StaffDashboard onLogout={() => { setIsAuthenticated(false); setUserRole(null); }} />;
  }

  return (
    <div className="bg-[var(--color-bg)] min-h-screen text-[var(--color-dark)] selection:bg-[var(--color-rani)] selection:text-white font-sans">
      
      <ChaiNavbar 
        onReserveClick={() => setIsReservationOpen(true)}
      />
      
      <main>
        <NeoHero />
        <ChaiAmbience />
        <div id="our-roots"><OurRoots /></div>
        <div id="brew-lab"><DrinkCrafter onAddToCart={handleAddToCart} /></div>
        <div id="menu"><ChaiMenu /></div>
        <div id="merch"><MerchShop onAddToCart={handleAddToCart} /></div>
        <div id="location"><ChaiFeatures /></div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-dark)] text-white py-16 flex flex-col items-center relative overflow-hidden">
        <div className="absolute top-0 right-10 w-32 h-32 bg-[var(--color-peacock)] rounded-full blur-[80px] opacity-20"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-[var(--color-marigold)] rounded-full blur-[80px] opacity-20"></div>
        
        <div className="font-black font-sans text-4xl md:text-5xl tracking-widest mb-4 uppercase relative z-10 text-[var(--color-marigold)]">HAWAtea</div>
        <p className="font-sans font-medium text-sm md:text-base uppercase tracking-widest mb-10 text-center max-w-sm relative z-10 opacity-80">Sip the Soul of India.</p>
        <div className="flex gap-6 font-sans text-sm font-black uppercase tracking-widest relative z-10">
          <a href="https://instagram.com/hawatea" target="_blank" rel="noreferrer" className="hover:text-[var(--color-rani)] hover:-translate-y-1 transition-all">Instagram</a>
          <span>•</span>
          <a href="https://tiktok.com/@hawatea" target="_blank" rel="noreferrer" className="hover:text-[var(--color-marigold)] hover:-translate-y-1 transition-all">TikTok</a>
          <span>•</span>
          <a href="#location" className="hover:text-[var(--color-emerald)] hover:-translate-y-1 transition-all">Find Us</a>
          <span>•</span>
          <button onClick={() => setIsStaffLoginOpen(true)} className="hover:text-[var(--color-peacock)] hover:-translate-y-1 transition-all uppercase tracking-widest">Staff Portal</button>
        </div>
      </footer>

      {/* Slide-Over Checkout Cart */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Reservation Modal */}
      <ReservationModal 
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Staff Login Modal */}
      <StaffLogin 
        isOpen={isStaffLoginOpen}
        onClose={() => setIsStaffLoginOpen(false)}
      />

    </div>
  );
}

export default App;
