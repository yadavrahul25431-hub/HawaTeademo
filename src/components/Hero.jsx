import React from 'react';
import { Coffee, Star, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full pt-12 pb-24 lg:pt-24 lg:pb-32 overflow-hidden bg-[#FAF8F5]">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 opacity-60 pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col items-start max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 text-orange-800 font-medium text-sm mb-6 shadow-sm border border-orange-200/50 backdrop-blur-sm">
              <span className="animate-pulse">🌿</span>
              Authentic Indian Chai
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.05] mb-6">
              Rituals<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-700">
                Made Chai.
              </span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-lg">
              A soulful escape in the heart of Hyderabad. Experience traditional village-themed ambiance with premium tea blends and authentic Telugu flavors.
            </p>
            
            <div className="flex flex-wrap items-center gap-5">
              <button className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-semibold overflow-hidden shadow-xl shadow-gray-900/20 hover:shadow-2xl hover:shadow-gray-900/30 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Menu
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <div className="flex items-center gap-4 pl-2">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-orange-200 shadow-sm" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-amber-200 shadow-sm" />
                  <div className="w-10 h-10 rounded-full border-2 border-white bg-red-200 shadow-sm flex items-center justify-center text-xs font-bold text-red-800">+</div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 text-orange-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-sm font-semibold text-gray-900">18k+ <span className="text-gray-500 font-normal">Happy visitors</span></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image/Visual */}
          <div className="relative w-full h-[500px] lg:h-[600px] pt-8 lg:pt-0">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gray-900/5 rotate-2 hover:rotate-0 transition-transform duration-500 bg-amber-50">
              <img 
                src="/hero-image.jpg" 
                alt="Anti-gravity pouring of authentic Hawtea Karak Chai" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1544787219-7f47ccb79070?q=80&w=2938&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>
            
            {/* Floating Glass Card */}
            <div className="absolute bottom-10 -left-4 sm:-left-8 p-5 bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl ring-1 ring-white/50 border border-white/40 flex items-center gap-4 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 text-orange-600 rounded-xl">
                <Coffee className="w-6 h-6" />
              </div>
              <div>
                <strong className="block text-gray-900 text-lg">Village Vibe</strong>
                <p className="text-sm text-gray-500 font-medium">Tranquil Escape</p>
              </div>
            </div>
            
            {/* Small decorative accent */}
            <div className="absolute top-10 -right-6 w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-600 rounded-full blur-2xl opacity-40 animate-pulse" />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Hero;
