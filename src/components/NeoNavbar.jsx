import React from 'react';
import { Coffee, ShoppingCart, Menu } from 'lucide-react';

const NeoNavbar = ({ cartItemCount, cartTotal, onCartClick }) => {
  return (
    <nav className="bg-[var(--color-paper)] border-b-[2.5px] border-[var(--color-black)] px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
      
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer group">
        <div className="bg-[var(--color-black)] text-[var(--color-yellow)] p-1.5 border-[2.5px] border-[var(--color-black)] group-hover:rotate-6 transition-transform">
          <Coffee size={24} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-black tracking-tight leading-none uppercase text-[var(--color-black)]">
            ROAST & RAW
          </span>
          <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-terracotta)] mt-0.5">
            EST. 2026
          </span>
        </div>
      </div>

      {/* Center Links (Desktop) */}
      <div className="hidden lg:flex items-center gap-8">
        {['Brews & Chai', 'Bites', 'Customizer', 'Vibe & Story'].map((link) => (
          <a 
            key={link} 
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            className="font-bold text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-[var(--color-black)] transition-colors"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right CTAs */}
      <div className="flex items-center gap-3 md:gap-5">
        
        {/* Status Badge - Hidden on very small screens */}
        <div className="hidden md:flex items-center gap-2 border-[2px] border-[var(--color-black)] rounded-full px-3 py-1 bg-white shadow-brutal-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-green)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-green)]"></span>
          </span>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
            Barracks Open (Wait: 6 Min)
          </span>
        </div>

        {/* Floating Cart Button */}
        <button 
          onClick={onCartClick}
          className="flex items-center gap-2 bg-[var(--color-yellow)] border-[2.5px] border-[var(--color-black)] px-3 py-1.5 md:px-4 md:py-2 rounded-full font-mono text-xs md:text-sm font-bold shadow-brutal hover-brutal active:scale-95"
        >
          <ShoppingCart size={16} strokeWidth={2.5} />
          <span className="hidden sm:inline">BAG ({cartItemCount})</span>
          <span className="sm:hidden">{cartItemCount}</span>
          <span className="opacity-30 mx-0.5">•</span>
          <span>₹{cartTotal}</span>
        </button>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden bg-white border-[2.5px] border-[var(--color-black)] p-1.5 shadow-brutal-sm hover-brutal active:scale-95">
          <Menu size={20} strokeWidth={2.5} />
        </button>

      </div>
    </nav>
  );
};

export default NeoNavbar;
