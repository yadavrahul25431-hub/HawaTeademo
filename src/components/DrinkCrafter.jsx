import React, { useState } from 'react';
import { Beaker, Plus, Check } from 'lucide-react';

const DrinkCrafter = ({ onAddToCart }) => {
  const [base, setBase] = useState('Filter Kaapi');
  const [milk, setMilk] = useState('Whole Dairy');
  const [sweetness, setSweetness] = useState('50%');
  const [addons, setAddons] = useState([]);

  const bases = [
    { id: 'Filter Kaapi', name: 'South Indian Filter Kaapi', price: 120 },
    { id: 'Kadak Chai', name: 'Ginger Elaichi Kadak Chai', price: 90 },
    { id: 'Cold Brew Tonic', name: 'Cold Brew Tonic', price: 160 },
    { id: 'Dirty Latte', name: 'Dirty Masala Latte', price: 180 },
  ];

  const milks = ['Whole Dairy', 'Oat', 'Almond', 'Condensed Milk'];
  const sweetnessLevels = ['0%', '25%', '50%', '100%'];
  
  const availableAddons = [
    { id: 'cardamom', name: 'Crushed Cardamom', price: 10 },
    { id: 'saffron', name: 'Saffron Strands', price: 40 },
    { id: 'parleg', name: 'Parle-G Dip', price: 15 },
    { id: 'cinnamon', name: 'Cinnamon Dust', price: 10 },
  ];

  const toggleAddon = (addonId) => {
    if (addons.includes(addonId)) {
      setAddons(addons.filter(a => a !== addonId));
    } else {
      setAddons([...addons, addonId]);
    }
  };

  const calculateTotal = () => {
    const basePrice = bases.find(b => b.id === base)?.price || 0;
    const addonsPrice = addons.reduce((total, addonId) => {
      const addon = availableAddons.find(a => a.id === addonId);
      return total + (addon?.price || 0);
    }, 0);
    const milkPrice = milk === 'Oat' || milk === 'Almond' ? 30 : 0;
    return basePrice + addonsPrice + milkPrice;
  };

  const handleAddToCart = () => {
    const addonNames = addons.map(id => availableAddons.find(a => a.id === id)?.name).join(', ');
    const addonsDesc = addons.length > 0 ? ` | Add-ons: ${addonNames}` : '';

    const customDrink = {
      id: `custom-${Date.now()}`,
      name: customName,
      price: calculateTotal(),
      description: `Base: ${base} | Milk: ${milk} | Sweetness: ${sweetness}${addonsDesc}`,
      quantity: 1
    };
    onAddToCart(customDrink);
  };

  const customName = `The ${addons.includes('saffron') ? 'Golden ' : ''}${milk === 'Oat' ? 'Hipster ' : ''}Rush #${Math.floor(Math.random() * 900) + 100}`;

  return (
    <section id="customizer" className="py-24 bg-[var(--color-bg)] relative border-t-[6px] border-[var(--color-dark)]">
      <div className="container mx-auto px-4 sm:px-8 max-w-7xl relative z-10">
        
        <div className="flex items-center gap-4 mb-12">
          <div className="bg-[var(--color-rani)] text-white p-3 rounded-xl shadow-sm">
            <Beaker size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black font-sans uppercase tracking-tight text-[var(--color-dark)]">The Brew Lab</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Controls (Left 8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Step 1: Base */}
            <div className="bg-white border-pop p-8 shadow-pop-sm rounded-3xl">
              <h3 className="font-black font-sans text-lg uppercase mb-6 tracking-widest text-[var(--color-rani)]">Step 1: Choose Base</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {bases.map(b => (
                  <button 
                    key={b.id}
                    onClick={() => setBase(b.id)}
                    className={`text-left p-5 rounded-2xl border-[2px] border-[var(--color-dark)] transition-all duration-200 font-sans ${base === b.id ? 'bg-[var(--color-marigold)] text-[var(--color-dark)] shadow-[4px_4px_0px_var(--color-dark)] -translate-y-1' : 'bg-white hover:bg-[var(--color-bg)] hover:-translate-y-1 shadow-[2px_2px_0px_var(--color-dark)]'}`}
                  >
                    <div className="text-xl font-black uppercase mb-1">{b.name}</div>
                    <div className="font-serif font-bold text-lg opacity-80">₹{b.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Milk */}
            <div className="bg-white border-pop p-8 shadow-pop-sm rounded-3xl">
              <h3 className="font-black font-sans text-lg uppercase mb-6 tracking-widest text-[var(--color-emerald)]">Step 2: Milk Selection</h3>
              <div className="flex flex-wrap gap-4">
                {milks.map(m => (
                  <button 
                    key={m}
                    onClick={() => setMilk(m)}
                    className={`px-6 py-3 rounded-full border-[2px] border-[var(--color-dark)] uppercase font-black transition-all duration-200 ${milk === m ? 'bg-[var(--color-peacock)] text-white shadow-[4px_4px_0px_var(--color-dark)] -translate-y-1' : 'bg-white hover:bg-[var(--color-bg)] hover:-translate-y-1 shadow-[2px_2px_0px_var(--color-dark)] text-[var(--color-dark)]'}`}
                  >
                    {m} {m === 'Oat' || m === 'Almond' ? <span className="opacity-80 font-normal text-sm ml-1">(+₹30)</span> : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Sweetness */}
            <div className="bg-white border-pop p-8 shadow-pop-sm rounded-3xl">
              <h3 className="font-black font-sans text-lg uppercase mb-6 tracking-widest text-[var(--color-marigold)]">Step 3: Sweetness</h3>
              <div className="relative w-full h-14 flex bg-[var(--color-bg)] rounded-2xl overflow-hidden border-[2px] border-[var(--color-dark)] shadow-[2px_2px_0px_var(--color-dark)]">
                {sweetnessLevels.map((level, idx) => (
                  <div 
                    key={level}
                    className="flex-1 relative border-r-[2px] border-[var(--color-dark)] last:border-r-0 cursor-pointer group"
                    onClick={() => setSweetness(level)}
                  >
                    <div className={`absolute inset-0 transition-colors ${sweetness === level ? 'bg-[var(--color-marigold)]' : 'group-hover:bg-[var(--color-marigold)]/30'}`} />
                    <span className={`absolute inset-0 flex items-center justify-center font-sans font-bold text-lg ${sweetness === level ? 'text-[var(--color-dark)]' : 'text-[var(--color-dark)]'}`}>
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Add-ons */}
            <div className="bg-white border-pop p-8 shadow-pop-sm rounded-3xl">
              <h3 className="font-black font-sans text-lg uppercase mb-6 tracking-widest text-[var(--color-peacock)]">Step 4: Spices</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {availableAddons.map(addon => (
                  <button 
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex flex-col items-start p-4 rounded-xl border-[2px] border-[var(--color-dark)] transition-all duration-200 ${addons.includes(addon.id) ? 'bg-[var(--color-emerald)] text-white shadow-[4px_4px_0px_var(--color-dark)] -translate-y-1' : 'bg-white hover:bg-[var(--color-bg)] hover:-translate-y-1 shadow-[2px_2px_0px_var(--color-dark)] text-[var(--color-dark)]'}`}
                  >
                    <div className="flex justify-between w-full items-center mb-3">
                      <div className={`w-6 h-6 rounded-md border-[2px] border-[var(--color-dark)] flex items-center justify-center ${addons.includes(addon.id) ? 'bg-white text-[var(--color-emerald)]' : 'bg-white'}`}>
                        {addons.includes(addon.id) && <Check size={16} strokeWidth={4} />}
                      </div>
                      <span className="font-sans font-bold text-sm opacity-90">+₹{addon.price}</span>
                    </div>
                    <span className="font-bold text-sm uppercase text-left leading-tight">{addon.name}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Live Preview Receipt (Right 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#FFF8EB] border-pop p-8 shadow-pop rounded-3xl flex flex-col items-center">
              
              {/* Receipt Header */}
              <div className="text-center w-full pb-6 mb-6">
                <div className="font-black font-sans text-3xl mb-1 text-[var(--color-peacock)] uppercase">HAWAtea</div>
                <div className="font-sans font-medium text-xs uppercase tracking-widest text-[var(--color-dark)]/50">Order Receipt #402</div>
              </div>

              {/* Custom Name */}
              <div className="text-center mb-8 w-full">
                <div className="inline-block px-4 py-1.5 bg-[var(--color-marigold)] text-[var(--color-dark)] rounded-full text-xs font-black uppercase tracking-widest mb-4">Your Brew</div>
                <h4 className="font-sans font-black text-2xl uppercase text-[var(--color-rani)] leading-tight">{customName}</h4>
              </div>

              {/* Itemized List */}
              <div className="w-full flex flex-col gap-3 font-sans font-medium text-sm mb-8 text-[var(--color-dark)] bg-white p-5 rounded-2xl border-[2px] border-[var(--color-dark)] shadow-sm">
                <div className="flex justify-between items-center text-base font-bold uppercase">
                  <span>{bases.find(b => b.id === base)?.name}</span>
                  <span>₹{bases.find(b => b.id === base)?.price}</span>
                </div>
                <div className="flex justify-between items-center opacity-80 uppercase text-xs">
                  <span>+ {milk}</span>
                  <span>{milk === 'Oat' || milk === 'Almond' ? '+₹30' : '₹0'}</span>
                </div>
                <div className="flex justify-between items-center opacity-80 uppercase">
                  <span>+ Sweetness: {sweetness}</span>
                  <span>₹0</span>
                </div>
                {addons.map(addonId => {
                  const addon = availableAddons.find(a => a.id === addonId);
                  return (
                    <div key={addonId} className="flex justify-between items-center opacity-80 uppercase">
                      <span>+ {addon.name}</span>
                      <span>+₹{addon.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Total */}
              <div className="w-full flex justify-between items-end border-t-[2px] border-dashed border-[var(--color-dark)] pt-6 mb-8 mt-4">
                <span className="font-bold text-lg text-[var(--color-dark)] uppercase">Total</span>
                <span className="font-sans font-black text-4xl text-[var(--color-dark)]">₹{calculateTotal()}</span>
              </div>

              {/* CTA */}
              <button 
                onClick={handleAddToCart}
                className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 rounded-full"
              >
                <Plus size={20} strokeWidth={3} />
                Add to Tray
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DrinkCrafter;
