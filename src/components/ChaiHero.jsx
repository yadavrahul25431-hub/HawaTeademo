import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const ChaiHero = ({ onReserveClick }) => {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-[var(--color-bg)]">
      {/* Pop Art Decorative Shapes */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-[var(--color-marigold)] rounded-full mix-blend-multiply blur-xl opacity-70 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-[var(--color-rani)] rounded-full mix-blend-multiply blur-xl opacity-60 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 left-10 w-48 h-48 bg-[var(--color-emerald)] rounded-full mix-blend-multiply blur-xl opacity-50 animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 pt-12 lg:pt-0">
        <div className="max-w-4xl lg:max-w-[50%]">
          <div className="inline-flex items-center gap-2 px-6 py-3 border-pop shadow-pop bg-white text-[var(--color-dark)] font-black font-sans uppercase tracking-widest text-sm mb-8">
            <Sparkles size={18} className="animate-pulse text-[var(--color-marigold)]" strokeWidth={3} />
            Sip the Soul of India
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-sans tracking-tighter text-[var(--color-dark)] leading-tight mb-8 uppercase">
            Brewed <br />
            <span className="text-[var(--color-rani)]">
              For Today.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-[var(--color-dark)] font-medium font-serif mb-12 leading-relaxed max-w-2xl">
            Discover slow-brewed single-origin coffees alongside kettle-boiled adrak chai, paired perfectly with fresh street-style buns.
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-4">
            <button 
              onClick={onReserveClick}
              className="btn-primary text-xl px-10 py-5 w-full sm:w-auto flex justify-center items-center gap-3 group"
            >
              Book a Tasting
              <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <a 
              href="#the-roast-&-brew"
              className="btn-secondary bg-[var(--color-peacock)] text-white text-xl px-10 py-5 w-full sm:w-auto text-center"
            >
              Signature Menu
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Image */}
      <div className="hidden lg:block absolute bottom-0 right-0 w-[45%] h-[80%] z-0">
        <div className="absolute inset-0 bg-[var(--color-marigold)] rounded-tl-3xl overflow-hidden shadow-pop-lg">
          <img 
            src="https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=2940&auto=format&fit=crop" 
            alt="Masala chai" 
            className="w-full h-full object-cover opacity-90 transition-all duration-500 hover:scale-105"
          />
        </div>
        <div className="absolute top-10 -left-10 bg-white border-pop shadow-pop px-6 py-4">
          <span className="font-black font-sans text-2xl uppercase text-[var(--color-dark)]">100% Desi</span>
        </div>
      </div>
    </section>
  );
};

export default ChaiHero;
