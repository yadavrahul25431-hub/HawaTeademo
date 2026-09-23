import React from 'react';

const Marquee = () => {
  const text = "⚡ FRESH BREW ON TAP • LIVE CHAI COUNTER • PICKUP IN 8 MINS • ROASTED DAILY IN-HOUSE • FREE BISCUIT WITH EVERY FILTER KAAPI ";
  
  return (
    <div className="bg-[var(--color-yellow)] border-b-[2.5px] border-[var(--color-black)] py-1.5 overflow-hidden flex w-full relative z-50">
      <div className="animate-marquee whitespace-nowrap flex font-mono text-xs font-bold uppercase tracking-widest text-[var(--color-black)]">
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );
};

export default Marquee;
