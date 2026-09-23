import React, { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';

const menuData = [
  {
    id: 'm1',
    name: 'Classic Bun Maska',
    category: 'Savory Bites & Bun Maska',
    description: 'Freshly baked sourdough bun, slathered with our house-whipped salted butter.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80',
    badge: '🌿 VEG',
    badgeColor: 'bg-[var(--color-green)] text-white'
  },
  {
    id: 'm2',
    name: 'Guntur Chilli Samosa',
    category: 'Savory Bites & Bun Maska',
    description: 'Spicy potato and peas filling with a fiery Guntur chilli kick.',
    price: 110,
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6af8bd6?auto=format&fit=crop&w=800&q=80',
    badge: '🌶️ SPICY',
    badgeColor: 'bg-[var(--color-terracotta)] text-white'
  },
  {
    id: 'm3',
    name: 'Signature Filter Kaapi',
    category: 'Signature Kaapi & Chai',
    description: '80/20 Chikmagalur blend, served traditionally in brass.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    badge: '⏱️ 3 MIN',
    badgeColor: 'bg-[var(--color-yellow)] text-black'
  },
  {
    id: 'm4',
    name: 'Iced Rose Cardamom',
    category: 'Iced & Tonics',
    description: 'Cold brew shaken with rose syrup, cardamom, and oat milk.',
    price: 190,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
    badge: '❄️ ICED',
    badgeColor: 'bg-[var(--color-black)] text-white'
  }
];

const categories = ['All', 'Signature Kaapi & Chai', 'Iced & Tonics', 'Savory Bites & Bun Maska', 'Dessert Bowls'];

const NeoMenu = ({ cartItems, onUpdateQuantity }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredMenu = activeCategory === 'All' 
    ? menuData 
    : menuData.filter(item => item.category === activeCategory);

  const getQuantity = (id) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  return (
    <section id="bites" className="py-24 bg-white relative border-y-[2.5px] border-[var(--color-black)]">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">Roast & Raw Menu</h2>
            <p className="font-mono text-sm opacity-80 uppercase tracking-widest max-w-md">No compromises. Just bold flavors and authentic ingredients served unapologetically.</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pill-badge hover-brutal ${activeCategory === cat ? 'bg-[var(--color-black)] text-[var(--color-yellow)] shadow-brutal-sm' : 'bg-white hover:bg-[var(--color-paper)]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredMenu.map(item => {
            const quantity = getQuantity(item.id);
            
            return (
              <div key={item.id} className="bg-white border-[2.5px] border-[var(--color-black)] rounded-xl flex flex-col overflow-hidden shadow-brutal hover-brutal-lg group">
                
                {/* Image */}
                <div className="relative h-48 border-b-[2.5px] border-[var(--color-black)] bg-[var(--color-paper)] overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[30%] contrast-125 group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute top-3 left-3 ${item.badgeColor} border-[2px] border-[var(--color-black)] px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest uppercase shadow-[2px_2px_0px_#111]`}>
                    {item.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="font-black text-xl uppercase leading-tight mb-2">{item.name}</h3>
                    <p className="text-sm font-medium opacity-80 leading-snug">{item.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-4 border-t-[2.5px] border-dashed border-[var(--color-black)]">
                    <span className="font-mono font-black text-xl tracking-tighter">₹{item.price}</span>
                    
                    {quantity === 0 ? (
                      <button 
                        onClick={() => onUpdateQuantity(item, 1)}
                        className="bg-[var(--color-yellow)] border-[2.5px] border-[var(--color-black)] px-3 py-1 font-black uppercase text-sm flex items-center gap-1 shadow-[2px_2px_0px_#111] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                      >
                        <Plus size={16} strokeWidth={3} /> Add
                      </button>
                    ) : (
                      <div className="flex items-center bg-[var(--color-black)] border-[2.5px] border-[var(--color-black)] text-white shadow-[2px_2px_0px_#111]">
                        <button 
                          onClick={() => onUpdateQuantity(item, quantity - 1)}
                          className="p-1 hover:bg-gray-800 transition-colors"
                        >
                          <Minus size={16} strokeWidth={3} />
                        </button>
                        <span className="font-mono font-bold w-6 text-center text-sm text-[var(--color-yellow)]">{quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item, quantity + 1)}
                          className="p-1 hover:bg-gray-800 transition-colors"
                        >
                          <Plus size={16} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default NeoMenu;
