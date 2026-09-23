import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const MerchShop = ({ onAddToCart }) => {
  const products = [
    {
      id: 'merch-1',
      name: 'HAWAtea Signature Tote',
      price: 450,
      image: 'https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?q=80&w=800&auto=format&fit=crop',
      description: 'Heavyweight canvas, brutalist typography. Carry your culture.',
      category: 'Merch'
    },
    {
      id: 'merch-2',
      name: 'Nilgiris Estate Roast (250g)',
      price: 650,
      image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop',
      description: 'Whole beans. Notes of dark chocolate and orange zest.',
      category: 'Coffee'
    },
    {
      id: 'merch-3',
      name: 'Kadak Chai Blend (250g)',
      price: 350,
      image: 'https://images.unsplash.com/photo-1594910243685-612b7f3bd164?q=80&w=800&auto=format&fit=crop',
      description: 'Our secret blend of Assam CTC and hand-pounded spices.',
      category: 'Tea'
    },
    {
      id: 'merch-4',
      name: 'Clay Kulhad Set (Set of 4)',
      price: 800,
      image: 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?q=80&w=800&auto=format&fit=crop',
      description: 'Authentic terracotta cups. Makes every sip taste better.',
      category: 'Ceramics'
    }
  ];

  const handleAdd = (product) => {
    onAddToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.category,
      quantity: 1
    });
  };

  return (
    <section className="py-24 bg-[var(--color-bg)] border-t-[6px] border-[var(--color-dark)] relative overflow-hidden">
      {/* Background shape */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-[var(--color-marigold)] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="inline-block bg-[var(--color-dark)] text-white px-4 py-1 font-black uppercase text-sm mb-4 transform -rotate-1 border-[2px] border-[var(--color-dark)] shadow-[4px_4px_0px_var(--color-marigold)]">
              BRING IT HOME
            </div>
            <h2 className="text-5xl md:text-7xl font-black font-sans uppercase tracking-tight text-[var(--color-dark)] leading-none">
              The <span className="text-[var(--color-peacock)] line-through decoration-4">Gift</span> <span className="text-[var(--color-rani)]">Stash.</span>
            </h2>
          </div>
          <button className="flex items-center gap-2 font-black uppercase tracking-widest text-[var(--color-dark)] hover:text-[var(--color-rani)] transition-colors group">
            View All Merch
            <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <div key={product.id} className={`group bg-white border-[3px] border-[var(--color-dark)] rounded-3xl p-4 shadow-[8px_8px_0px_var(--color-dark)] hover:shadow-[12px_12px_0px_var(--color-dark)] transition-all duration-300 transform ${idx % 2 === 0 ? 'hover:-rotate-2' : 'hover:rotate-2'}`}>
              
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-[2px] border-[var(--color-dark)] mb-6 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-[var(--color-bg)] border-[2px] border-[var(--color-dark)] px-3 py-1 font-black uppercase text-xs shadow-sm transform -rotate-3">
                  {product.category}
                </div>
              </div>

              {/* Info */}
              <div className="mb-6">
                <h3 className="font-black font-sans text-xl uppercase leading-tight mb-2 group-hover:text-[var(--color-peacock)] transition-colors">{product.name}</h3>
                <p className="font-serif font-medium text-sm text-gray-600 line-clamp-2">{product.description}</p>
              </div>

              {/* Action */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t-[2px] border-dashed border-gray-300">
                <div className="font-black font-sans text-2xl">₹{product.price}</div>
                <button 
                  onClick={() => handleAdd(product)}
                  className="w-12 h-12 rounded-full bg-[var(--color-dark)] text-white flex items-center justify-center border-[2px] border-[var(--color-dark)] hover:bg-[var(--color-marigold)] hover:text-[var(--color-dark)] transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingBag size={20} strokeWidth={2.5} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MerchShop;
