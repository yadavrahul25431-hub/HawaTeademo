import React from 'react';
import { Coffee } from 'lucide-react';

const LoyaltyCard = () => {
  const totalStamps = 5;
  const stampedCount = 3;

  return (
    <section className="py-24 bg-[var(--color-terracotta)] border-b-[2.5px] border-[var(--color-black)] relative overflow-hidden">
      
      {/* Decorative repeating text background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex flex-col justify-center gap-4 overflow-hidden -skew-y-3">
        {Array(10).fill('STAY LOYAL STAY RAW ').map((text, i) => (
          <div key={i} className="whitespace-nowrap font-black text-6xl md:text-8xl text-white uppercase tracking-tighter">
            {text.repeat(10)}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-8 max-w-4xl relative z-10">
        
        <div className="bg-white border-[3px] border-[var(--color-black)] p-8 md:p-12 shadow-brutal-lg flex flex-col items-center text-center transform rotate-1 hover:rotate-0 transition-transform">
          
          <div className="pill-badge bg-[var(--color-black)] text-[var(--color-yellow)] mb-6 transform -rotate-3">
            THE INNER CIRCLE
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 tracking-tight">
            Buy 5 Brews, <br/> 6th is on the House.
          </h2>
          
          <p className="font-mono text-sm uppercase tracking-widest opacity-80 mb-10 max-w-lg">
            No plastic cards. No bullshit. Just good coffee and good karma for our regulars.
          </p>

          <div className="bg-[var(--color-paper)] border-[2.5px] border-[var(--color-black)] p-6 md:p-8 w-full max-w-2xl relative shadow-inner">
            
            <div className="absolute -top-3 -right-3 bg-[var(--color-yellow)] border-[2px] border-[var(--color-black)] px-3 py-1 font-black transform rotate-12 shadow-[2px_2px_0px_#111]">
              2 TO GO!
            </div>

            <div className="grid grid-cols-5 gap-3 md:gap-6">
              {Array.from({ length: totalStamps }).map((_, idx) => {
                const isStamped = idx < stampedCount;
                return (
                  <div 
                    key={idx}
                    className={`aspect-square border-[2.5px] rounded-full flex items-center justify-center relative ${
                      isStamped 
                        ? 'border-[var(--color-black)] bg-[var(--color-green)] text-white' 
                        : 'border-dashed border-[var(--color-black)]/40 bg-transparent'
                    }`}
                  >
                    {isStamped ? (
                      <>
                        <Coffee size={28} strokeWidth={2.5} className="relative z-10 transform -rotate-12" />
                        <div className="absolute inset-0 bg-white/20 rounded-full scale-75 blur-sm" />
                        <div className="absolute -bottom-2 -right-1 bg-[var(--color-black)] text-white text-[9px] font-mono px-1 border-[1px] border-white transform rotate-12">
                          STAMPED
                        </div>
                      </>
                    ) : (
                      <span className="font-mono text-xl opacity-20 font-bold">{idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 flex justify-between items-center border-t-[2.5px] border-dashed border-[var(--color-black)] pt-4 font-mono text-xs font-bold uppercase tracking-widest">
              <span>Member ID: #RAW-0042</span>
              <span>Valid Thru: 12/26</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LoyaltyCard;
