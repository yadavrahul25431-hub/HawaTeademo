import React from 'react';

const OurRoots = () => {
  return (
    <section className="bg-[var(--color-dark)] text-white py-24 relative overflow-hidden border-t-[6px] border-[var(--color-dark)]">
      
      {/* Decorative Marquee */}
      <div className="absolute top-0 left-0 w-full overflow-hidden bg-[var(--color-marigold)] text-[var(--color-dark)] py-3 border-b-[4px] border-[var(--color-dark)] transform -rotate-2 scale-105 z-10 flex whitespace-nowrap">
        <div className="animate-marquee font-black font-sans uppercase tracking-widest text-xl flex gap-8 items-center">
          <span>☕ SINGLE-ORIGIN SOUTH INDIAN ESTATE BEANS</span>
          <span>✦</span>
          <span>SLOW-COOKED CLAY POT KADAK CHAI</span>
          <span>✦</span>
          <span>SOURDOUGH BUN MASKA</span>
          <span>✦</span>
          <span>☕ SINGLE-ORIGIN SOUTH INDIAN ESTATE BEANS</span>
          <span>✦</span>
          <span>SLOW-COOKED CLAY POT KADAK CHAI</span>
          <span>✦</span>
        </div>
        <div className="animate-marquee font-black font-sans uppercase tracking-widest text-xl flex gap-8 items-center absolute top-3 left-full">
          <span>☕ SINGLE-ORIGIN SOUTH INDIAN ESTATE BEANS</span>
          <span>✦</span>
          <span>SLOW-COOKED CLAY POT KADAK CHAI</span>
          <span>✦</span>
          <span>SOURDOUGH BUN MASKA</span>
          <span>✦</span>
          <span>☕ SINGLE-ORIGIN SOUTH INDIAN ESTATE BEANS</span>
          <span>✦</span>
          <span>SLOW-COOKED CLAY POT KADAK CHAI</span>
          <span>✦</span>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 mt-16">
        <div className="mb-16 md:w-2/3">
          <h2 className="text-5xl md:text-7xl font-black font-serif text-white mb-6 uppercase leading-none">
            Grounded in <span className="text-[var(--color-rani)]">Tradition.</span><br />
            Brewed for <span className="text-[var(--color-emerald)]">Today.</span>
          </h2>
          <p className="text-xl font-sans font-medium text-gray-300 max-w-2xl leading-relaxed">
            From the misty hills of the Nilgiris to the bustling streets of Hyderabad. We don't just serve chai and kaapi; we preserve a legacy, spiked with modern street culture.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-center">
          
          {/* Image 1 */}
          <div className="md:col-span-5 relative group">
            <div className="relative border-[4px] border-[var(--color-marigold)] rounded-3xl overflow-hidden shadow-[8px_8px_0px_var(--color-marigold)] bg-white p-2 transform -rotate-3 transition-transform group-hover:rotate-0">
              <img 
                src="/signature_brew.jpg" 
                alt="Clay Pot Chai" 
                className="w-full h-[400px] object-cover rounded-2xl grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Sticker */}
              <div className="absolute top-6 -right-6 bg-[var(--color-rani)] text-white px-4 py-2 font-black uppercase tracking-widest text-xl transform rotate-12 shadow-[4px_4px_0px_var(--color-dark)] border-[2px] border-[var(--color-dark)]">
                AUTHENTIC
              </div>
            </div>
          </div>

          {/* Text Block */}
          <div className="md:col-span-3 flex flex-col gap-8 px-4">
            <div className="bg-[var(--color-peacock)] p-6 rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_white] transform rotate-2">
              <h3 className="font-black font-sans uppercase text-2xl mb-2">100% Direct Trade</h3>
              <p className="font-medium text-sm">We bypass the middlemen to ensure our farmers get the cut they deserve.</p>
            </div>
            <div className="bg-[var(--color-emerald)] p-6 rounded-2xl border-[3px] border-white shadow-[6px_6px_0px_white] transform -rotate-1">
              <h3 className="font-black font-sans uppercase text-2xl mb-2">Clay Pot Magic</h3>
              <p className="font-medium text-sm">Every batch of our Kadak Chai is slow-boiled in traditional earthen pots for that earthy, robust flavor.</p>
            </div>
          </div>

          {/* Image 2 */}
          <div className="md:col-span-4 relative group mt-8 md:mt-0">
            <div className="relative border-[4px] border-[var(--color-peacock)] rounded-3xl overflow-hidden shadow-[8px_8px_0px_var(--color-peacock)] bg-white p-2 transform rotate-3 transition-transform group-hover:-rotate-0">
              <img 
                src="/coffee_beans.jpg" 
                alt="Coffee Beans" 
                className="w-full h-[300px] object-cover rounded-2xl grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
              />
              {/* Sticker */}
              <div className="absolute -bottom-4 -left-4 bg-[var(--color-marigold)] text-[var(--color-dark)] px-4 py-2 font-black uppercase tracking-widest text-lg transform -rotate-6 shadow-[4px_4px_0px_var(--color-dark)] border-[2px] border-[var(--color-dark)]">
                NILGIRIS HIGHLANDS
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurRoots;
