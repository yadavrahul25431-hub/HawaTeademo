import React, { useState } from 'react';
import { Leaf, Coffee, Flame, Sparkles } from 'lucide-react';

const menuData = [
  {
    id: 'masala-chai',
    name: 'Kadak Masala Chai',
    icon: <Flame size={32} strokeWidth={2.5} />,
    description: 'Our signature robust Assam CTC tea, slow-boiled with freshly pounded ginger, cardamom, and cloves.',
    tastingNotes: ['Spicy', 'Robust', 'Warming'],
    pairing: 'Bun Maska',
    color: 'bg-[var(--color-marigold)]',
    textColor: 'text-[var(--color-dark)]'
  },
  {
    id: 'filter-kaapi',
    name: 'Mysore Filter Kaapi',
    icon: <Coffee size={32} strokeWidth={2.5} />,
    description: 'Authentic 80/20 coffee-chicory blend from Chikmagalur, frothed to perfection in traditional brass davarahs.',
    tastingNotes: ['Nutty', 'Intense', 'Caramel'],
    pairing: 'Medu Vada',
    color: 'bg-[var(--color-peacock)]',
    textColor: 'text-white'
  },
  {
    id: 'rose-cardamom',
    name: 'Rose Cardamom Foam',
    icon: <Sparkles size={32} strokeWidth={2.5} />,
    description: 'A modern chilled delight. Lightly sweetened rose milk topped with aromatic cardamom-infused cold foam.',
    tastingNotes: ['Floral', 'Creamy', 'Refreshing'],
    pairing: 'Pistachio Nankhatai',
    color: 'bg-[var(--color-rani)]',
    textColor: 'text-white'
  },
  {
    id: 'saffron-latte',
    name: 'Saffron Haldi Latte',
    icon: <Leaf size={32} strokeWidth={2.5} />,
    description: 'The golden elixir. Warm milk infused with Kashmiri saffron strands, Lakadong turmeric, and black pepper.',
    tastingNotes: ['Earthy', 'Luxurious', 'Healing'],
    pairing: 'Almond Biscotti',
    color: 'bg-[var(--color-emerald)]',
    textColor: 'text-white'
  }
];

const ChaiMenu = () => {
  const [activeItem, setActiveItem] = useState(menuData[0].id);

  return (
    <section id="the-roast-&-brew" className="py-24 bg-[var(--color-bg)] border-t-[6px] border-[var(--color-dark)] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-black font-sans uppercase mb-4 text-[var(--color-dark)]">The Sensory Menu</h2>
          <p className="text-lg font-bold font-serif text-[var(--color-dark)]/80 inline-block">
            Every cup tells a bold story of heritage.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Menu Selection */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {menuData.map((item) => (
              <button
                key={item.id}
                onMouseEnter={() => setActiveItem(item.id)}
                onClick={() => setActiveItem(item.id)}
                className={`p-4 text-left transition-all duration-300 border-pop w-full group ${
                  activeItem === item.id 
                    ? `${item.color} ${item.textColor} shadow-pop-lg -translate-y-1` 
                    : 'bg-white hover:bg-[var(--color-bg)] shadow-pop hover:-translate-y-1'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`p-3 rounded-xl ${activeItem === item.id ? 'bg-white text-[var(--color-dark)]' : `${item.color} ${item.textColor}`} transition-transform`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-sans uppercase tracking-tight">{item.name}</h3>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {item.tastingNotes.map((note) => (
                        <span key={note} className={`text-xs font-bold font-sans uppercase px-2 py-1 border-2 border-[var(--color-dark)] ${activeItem === item.id ? 'bg-[var(--color-dark)] text-white' : 'bg-gray-100 text-[var(--color-dark)]'}`}>
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Detail View */}
          <div className="lg:col-span-7 relative">
            {menuData.map((item) => (
              <div 
                key={`detail-${item.id}`}
                className={`transition-all duration-300 w-full ${
                  activeItem === item.id 
                    ? 'opacity-100 translate-y-0 relative z-10' 
                    : 'opacity-0 translate-y-8 absolute top-0 left-0 pointer-events-none'
                }`}
              >
                <div className={`${item.color} ${item.textColor} border-pop shadow-pop-lg p-8 md:p-12 relative overflow-hidden`}>
                  {/* Accent texture */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--color-dark) 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
                  
                  <div className="relative z-10">
                    <div className="mb-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/20 text-white flex items-center justify-center mb-6 backdrop-blur-md">
                        {item.icon}
                      </div>
                      <h3 className="text-4xl md:text-5xl font-black font-sans uppercase mb-4 leading-tight">{item.name}</h3>
                      <p className="text-xl font-serif font-bold leading-relaxed text-white/90">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-8 border-t border-white/20 pt-8">
                      <div className="font-sans font-bold uppercase text-sm mb-2 text-white/80 tracking-widest">
                        Perfect Pairing
                      </div>
                      <div className="text-white">
                        <p className="font-black text-2xl font-sans uppercase">{item.pairing}</p>
                        <p className="text-sm font-serif mt-1 opacity-80">Enhances the tasting profile</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bite Highlights */}
        <div className="mt-32 pt-16 border-t-[2px] border-[var(--color-dark)] border-dashed">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-black font-sans uppercase">Street-Meets-Gourmet</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Bun Maska Trio', color: 'bg-[var(--color-marigold)]' },
              { title: 'Irani Chai Combo', color: 'bg-[var(--color-emerald)]' },
              { title: 'Samosa Sliders', color: 'bg-[var(--color-rani)]' }
            ].map((bite, i) => (
              <div key={bite.title} className="bg-white border-pop p-6 shadow-pop hover:shadow-pop-lg hover:-translate-y-2 transition-all group cursor-pointer">
                <div className={`h-48 rounded-xl ${bite.color} mb-6 overflow-hidden relative`}>
                  <img src={`https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2940&auto=format&fit=crop&sig=${i}`} alt={bite.title} className="w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100" />
                </div>
                <h4 className="text-xl font-black font-sans uppercase mb-2">{bite.title}</h4>
                <p className="font-serif font-bold text-sm text-[var(--color-dark)]/70">The authentic streets of India, elevated.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChaiMenu;
