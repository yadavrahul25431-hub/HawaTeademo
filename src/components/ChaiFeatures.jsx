import React from 'react';
import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';

const ChaiFeatures = () => {
  return (
    <section className="py-24 bg-[var(--color-bg)] relative overflow-hidden border-t-[6px] border-[var(--color-dark)]">
      {/* Background shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-peacock)] opacity-10 rounded-l-full transform translate-x-1/4"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Testimonials */}
          <div>
            <h2 className="text-4xl md:text-5xl font-black font-sans uppercase mb-12 text-[var(--color-dark)]">Guests Say</h2>
            
            <div className="flex flex-col gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-8 border-pop shadow-pop relative rounded-2xl">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-[var(--color-marigold)] border-pop flex items-center justify-center rounded-full font-serif text-5xl text-[var(--color-dark)] font-black">"</div>
                <div className="flex gap-1 text-[var(--color-peacock)] mb-6">
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                </div>
                <p className="text-xl font-serif font-bold text-[var(--color-dark)] mb-6 leading-relaxed relative z-10">
                  "The most authentic Filter Kaapi. The neon vibes instantly wake you up. Highly recommend the Bun Maska!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-[3px] border-[var(--color-dark)] overflow-hidden shadow-pop-sm">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Priya S." className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
                  </div>
                  <div>
                    <h4 className="font-black font-sans uppercase text-[var(--color-dark)] text-xl">Priya S.</h4>
                    <p className="text-sm font-bold font-serif text-[var(--color-rani)]">Local Guide</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-[var(--color-dark)] text-white p-8 border-pop shadow-pop relative ml-0 sm:ml-8 rounded-2xl">
                <div className="absolute -top-6 -right-6 w-16 h-16 bg-[var(--color-emerald)] border-[2px] border-[var(--color-dark)] flex items-center justify-center rounded-full font-serif text-5xl text-white font-black">"</div>
                <div className="flex gap-1 text-[var(--color-marigold)] mb-6">
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                  <Star size={24} fill="currentColor" strokeWidth={2} />
                </div>
                <p className="text-xl font-serif font-bold mb-6 leading-relaxed relative z-10">
                  "A sensory overload in the best way. The Saffron Turmeric Latte is electric. A must-visit space."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-[3px] border-[var(--color-marigold)] overflow-hidden shadow-pop-sm">
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Rahul K." className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all" />
                  </div>
                  <div>
                    <h4 className="font-black font-sans uppercase text-xl">Rahul K.</h4>
                    <p className="text-sm font-bold font-serif text-[var(--color-emerald)]">Design Lead</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Info Card */}
          <div className="lg:pl-12">
            <div className="bg-white border-pop shadow-pop-lg p-8 md:p-12 rounded-3xl">
              
              <div className="flex flex-col gap-10">
                {/* Status Indicator */}
                <div className="flex items-center gap-4">
                  <div className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-emerald)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-[var(--color-emerald)] border-[2px] border-[var(--color-dark)]"></span>
                  </div>
                  <h3 className="text-3xl font-black font-sans uppercase">Brewing Now</h3>
                </div>
                
                {/* Hours */}
                <div className="flex items-start gap-4 pb-8 border-b-[2px] border-dashed border-[var(--color-dark)]">
                  <div className="w-14 h-14 bg-[var(--color-bg)] text-[var(--color-dark)] flex items-center justify-center shrink-0 border-[2px] border-[var(--color-dark)] rounded-full">
                    <Clock size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-black font-sans uppercase text-2xl mb-4">Opening Hours</h4>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-serif font-bold text-lg">
                      <span className="text-gray-600">Mon - Fri</span>
                      <span className="text-[var(--color-dark)]">07:00 AM - 11:00 PM</span>
                      <span className="text-gray-600">Sat - Sun</span>
                      <span className="text-[var(--color-dark)]">08:00 AM - 12:00 AM</span>
                    </div>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[var(--color-bg)] text-[var(--color-dark)] flex items-center justify-center shrink-0 border-[2px] border-[var(--color-dark)] rounded-full">
                    <MapPin size={28} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h4 className="font-black font-sans uppercase text-xl mb-2">Location</h4>
                    <p className="font-serif font-medium text-lg text-gray-700 mb-6">
                      128 Heritage Block, Jubilee Hills,<br/>
                      Hyderabad, Telangana 500033
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Jubilee+Hills,+Hyderabad,+Telangana+500033" 
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-dark)] text-white font-black font-sans uppercase tracking-widest text-sm hover:bg-[var(--color-marigold)] hover:text-[var(--color-dark)] transition-colors border-[2px] border-[var(--color-dark)] rounded-full"
                    >
                      Get Directions
                      <ArrowRight size={20} strokeWidth={3} />
                    </a>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ChaiFeatures;
