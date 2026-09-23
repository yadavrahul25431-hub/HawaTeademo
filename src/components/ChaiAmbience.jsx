import React from 'react';
import { Music, Users, Sun, Sofa } from 'lucide-react';

const ChaiAmbience = () => {
  return (
    <section id="our-heritage" className="py-24 bg-[var(--color-peacock)] text-white relative overflow-hidden border-t-[6px] border-[var(--color-dark)]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
          <div className="lg:w-1/2">
            <h2 className="text-5xl md:text-6xl font-black font-sans uppercase mb-6 leading-tight text-[var(--color-bg)]">
              Where <span className="text-[var(--color-marigold)]">Heritage</span> <br/> Meets Pop.
            </h2>
            <p className="text-xl font-medium font-serif mb-10 p-6 bg-white text-[var(--color-dark)] border-pop shadow-pop">
              Step into a space designed to wake you up. We've blended the bold energy of Indian street culture with modern maximalism to create your perfect vibrant hangout.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { icon: <Sun size={32} strokeWidth={2.5} />, title: 'Neon Diyas', desc: 'Electric ambient lighting.', color: 'bg-[var(--color-rani)]' },
                { icon: <Sofa size={32} strokeWidth={2.5} />, title: 'Print Cushions', desc: 'Cozy, high-contrast floor seating.', color: 'bg-[var(--color-marigold)]' },
                { icon: <Music size={32} strokeWidth={2.5} />, title: 'Vinyl Corner', desc: 'Retro Bollywood funk records.', color: 'bg-[var(--color-emerald)]' },
                { icon: <Users size={32} strokeWidth={2.5} />, title: 'Work Benches', desc: 'Communal spaces for creators.', color: 'bg-white' }
              ].map((feature, i) => (
                <div key={i} className="flex flex-col gap-3 p-5 border-pop shadow-pop bg-white">
                  <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-1 shadow-sm`}>
                    <div className={feature.color === 'bg-white' ? 'text-[var(--color-dark)]' : 'text-white'}>
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-black font-sans uppercase text-lg text-[var(--color-dark)]">{feature.title}</h4>
                  <p className="text-sm font-medium font-serif text-[var(--color-dark)]/70">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-6 h-[600px] p-6 bg-[var(--color-bg)] border-pop shadow-pop-lg">
              <div className="flex flex-col gap-6">
                <div className="h-2/3 border-pop shadow-pop bg-[var(--color-rani)] overflow-hidden relative group rounded-2xl">
                  <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2947&auto=format&fit=crop" alt="Cafe Interior" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
                </div>
                <div className="h-1/3 border-pop shadow-pop bg-[var(--color-emerald)] overflow-hidden relative group rounded-2xl">
                  <img src="https://images.unsplash.com/photo-1507133750070-4cb6b54a287c?q=80&w=3029&auto=format&fit=crop" alt="Coffee Pour" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-12">
                <div className="h-1/3 border-pop shadow-pop bg-[var(--color-marigold)] overflow-hidden relative group flex items-center justify-center p-6 text-center rounded-2xl">
                   <p className="font-sans font-black uppercase text-xl text-[var(--color-dark)] leading-snug">
                     "BOLD FLAVORS."
                   </p>
                </div>
                <div className="h-2/3 border-pop shadow-pop bg-white overflow-hidden relative group rounded-2xl">
                  <img src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2787&auto=format&fit=crop" alt="Spices" className="w-full h-full object-cover transition-all duration-500 hover:scale-105" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChaiAmbience;
