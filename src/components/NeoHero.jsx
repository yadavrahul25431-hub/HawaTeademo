import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, MapPin } from 'lucide-react';

const NeoHero = () => {
  const [orderType, setOrderType] = useState('takeaway');
  const [tableNumber, setTableNumber] = useState('');
  const [liveTemp, setLiveTemp] = useState(85);

  // Simulate a live brewing temp fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTemp(prev => prev === 85 ? 86 : prev === 86 ? 84 : 85);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[calc(100vh-100px)] w-full flex items-center justify-center pb-12 pt-32 lg:pt-40 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 border-[2.5px] border-[var(--color-dark)] rounded-full opacity-20 pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-48 h-12 bg-[var(--color-marigold)] border-[2.5px] border-[var(--color-dark)] transform -rotate-12 opacity-20 pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          
          {/* Left: Text & CTA (60%) */}
          <div className="w-full lg:w-[60%] flex flex-col gap-6 z-10">
            
            {/* Micro Tag */}
            <div className="self-start pill-badge bg-white shadow-brutal-sm transform -rotate-2">
              ☕ ARTISANAL BEVERAGES & INDIAN STREET EATS
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif italic font-black uppercase leading-tight tracking-tight">
              NOT YOUR AVERAGE DULL CUP. SIPPED <span className="inline-block bg-[var(--color-rani)] text-white font-sans px-4 pt-2 pb-1 border-[3px] border-[var(--color-dark)] shadow-brutal transform rotate-2 mx-2">BOLD.</span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl font-medium max-w-xl leading-relaxed mt-4">
              Single-origin South Indian estate beans, slow-cooked clay pot kadak chai, and sourdough bun maska. Handcrafted fresh, delivered hot to your seat or ready for instant curbside pickup.
            </p>

            {/* Quick Action Bar */}
            <div className="mt-6 bg-white border-[2.5px] border-[var(--color-dark)] p-4 shadow-brutal-lg max-w-xl">
              <div className="flex flex-col gap-4">
                
                {/* Tabs */}
                <div className="flex gap-2 font-mono text-sm uppercase font-bold">
                  <button 
                    onClick={() => setOrderType('takeaway')}
                    className={`flex-1 py-2 border-[2.5px] border-[var(--color-dark)] transition-colors ${orderType === 'takeaway' ? 'bg-[var(--color-marigold)]' : 'bg-[var(--color-bg)] opacity-60 hover:opacity-100'}`}
                  >
                    🏃 Takeaway / Curbside
                  </button>
                  <button 
                    onClick={() => setOrderType('dine-in')}
                    className={`flex-1 py-2 border-[2.5px] border-[var(--color-dark)] transition-colors ${orderType === 'dine-in' ? 'bg-[var(--color-marigold)]' : 'bg-[var(--color-bg)] opacity-60 hover:opacity-100'}`}
                  >
                    🪑 Dine-in Order
                  </button>
                </div>

                <div className="flex gap-3">
                  {orderType === 'dine-in' && (
                    <input 
                      type="number" 
                      placeholder="Table No." 
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="w-1/3 bg-[var(--color-bg)] border-[2.5px] border-[var(--color-dark)] px-3 py-3 font-mono font-bold text-center focus:outline-none focus:bg-white"
                    />
                  )}
                  
                  <button 
                    onClick={() => document.getElementById('customizer')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex-1 bg-[var(--color-dark)] text-[var(--color-marigold)] border-[2.5px] border-[var(--color-dark)] flex items-center justify-center gap-2 py-3 font-black text-xl uppercase tracking-widest hover:bg-[var(--color-rani)] hover:text-white transition-colors group"
                  >
                    ORDER NOW 
                    <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          {/* Right: Interactive Card (40%) */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end relative">
            
            {/* The Brutalist Image Card */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] bg-white border-[3px] border-[var(--color-dark)] rounded-xl shadow-brutal-lg overflow-hidden group">
              <img 
                src="/signature_brew.jpg" 
                alt="Signature Brew"
                className="w-full h-full object-cover grayscale-[20%] contrast-125 group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Overlay elements */}
              <div className="absolute inset-0 border-[4px] border-[var(--color-dark)] m-2 pointer-events-none" />
              
              {/* Bestseller Sticker */}
              <div className="absolute top-6 -right-4 bg-[var(--color-marigold)] border-[2.5px] border-[var(--color-dark)] px-4 py-1 transform rotate-[15deg] font-black uppercase text-xl shadow-brutal-sm">
                ⭐ BESTSELLER
              </div>

              {/* Tag Sticker */}
              <div className="absolute bottom-24 -left-2 bg-[var(--color-emerald)] text-white border-[2.5px] border-[var(--color-dark)] px-3 py-1 transform -rotate-[5deg] font-mono font-bold uppercase text-xs shadow-brutal-sm">
                100% ARABICA
              </div>

              {/* Live Temp Badge */}
              <div className="absolute bottom-6 right-6 bg-white border-[2.5px] border-[var(--color-dark)] px-3 py-2 flex items-center gap-2 shadow-brutal-sm">
                <Flame size={18} fill="var(--color-rani)" stroke="var(--color-dark)" strokeWidth={2} />
                <span className="font-mono font-bold text-sm tracking-widest">{liveTemp}°C BREW</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NeoHero;
