import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X } from 'lucide-react';

const ChaiNavbar = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    "The Roast & Brew",
    "Artisanal Chai",
    "Desi Bites",
    "Our Heritage",
    "Order Online"
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <nav className={`relative rounded-full transition-all duration-300 flex items-center justify-between px-6 py-3 ${
          isScrolled ? 'bg-[var(--color-bg)] border-pop shadow-pop' : 'bg-[var(--color-bg)] border-[3px] border-transparent shadow-none'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 border-[var(--color-dark)] bg-[var(--color-marigold)] text-[var(--color-dark)] shadow-[2px_2px_0px_var(--color-dark)]`}>
              <Coffee size={24} strokeWidth={2.5} />
            </div>
            <span className={`text-3xl font-black font-sans uppercase tracking-tight text-[var(--color-dark)]`} style={{ textShadow: isScrolled ? 'none' : '2px 2px 0px var(--color-rani)' }}>
              HAWAtea
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-black font-sans uppercase tracking-widest text-[var(--color-dark)] hover:text-[var(--color-peacock)] hover:-translate-y-1 transition-transform"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onReserveClick}
              className="hidden md:block btn-primary px-6 py-3"
            >
              Reserve Table
            </button>
            
            <button 
              className="lg:hidden p-2 rounded-full bg-[var(--color-marigold)] border-2 border-[var(--color-dark)] text-[var(--color-dark)] shadow-[2px_2px_0px_var(--color-dark)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden absolute top-full left-0 right-0 mt-4 mx-4 transition-all duration-300 origin-top ${
          mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-[var(--color-emerald)] border-pop shadow-pop-lg p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link} 
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-xl font-black font-sans uppercase text-[var(--color-dark)] hover:text-white py-3 border-b-4 border-[var(--color-dark)]/20"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              onReserveClick();
            }}
            className="mt-6 w-full btn-secondary py-4 bg-[var(--color-marigold)] text-[var(--color-dark)] hover:bg-[var(--color-rani)]"
          >
            Reserve Table
          </button>
        </div>
      </div>
    </header>
  );
};

export default ChaiNavbar;
