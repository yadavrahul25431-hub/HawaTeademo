import React, { useState } from 'react';
import { ArrowRight, Coffee, Lock } from 'lucide-react';

const SplashLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      if (email.endsWith('@hawatea.com')) {
        onLogin('staff');
      } else {
        onLogin('customer');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[var(--color-peacock)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[var(--color-rani)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-5xl bg-white rounded-3xl border-4 border-[var(--color-dark)] shadow-[12px_12px_0px_var(--color-dark)] grid md:grid-cols-2 overflow-hidden relative z-10 animate-fade-in">
        
        {/* Left Side: Visual Branding */}
        <div className="bg-[var(--color-marigold)] p-12 flex flex-col justify-center relative border-r-4 border-[var(--color-dark)] hidden md:flex">
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-dark)_2px,transparent_2px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10">
            <div className="w-20 h-20 bg-[var(--color-dark)] text-[var(--color-marigold)] flex items-center justify-center rounded-2xl border-4 border-[var(--color-dark)] shadow-[4px_4px_0px_var(--color-dark)] mb-8 -rotate-6">
              <Coffee size={40} strokeWidth={2.5} />
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black font-sans uppercase leading-[1] mb-6 text-[var(--color-dark)]">
              Welcome to <br/>
              <span className="text-white drop-shadow-[2px_2px_0px_var(--color-dark)]">HAWAtea.</span>
            </h1>
            <p className="font-bold font-serif text-xl max-w-sm text-[var(--color-dark)]">
              Sip the soul of India. Sign in to place your digital order and track it live.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black font-sans uppercase tracking-tight text-[var(--color-dark)]">Member Access</h2>
            <p className="text-gray-500 font-bold font-serif mt-2">Enter your details to view the menu.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-sans">
            <div className="group">
              <label className="block font-black uppercase tracking-wider mb-2 text-sm text-[var(--color-dark)] group-focus-within:text-[var(--color-peacock)] transition-colors">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-4 pl-5 border-4 border-[var(--color-dark)] bg-[var(--color-bg)] rounded-xl focus:outline-none focus:bg-white focus:border-[var(--color-peacock)] focus:shadow-[4px_4px_0px_var(--color-peacock)] transition-all font-bold text-lg"
                  placeholder="chai.lover@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="group">
              <label className="block font-black uppercase tracking-wider mb-2 text-sm text-[var(--color-dark)] group-focus-within:text-[var(--color-rani)] transition-colors">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-4 pl-5 border-4 border-[var(--color-dark)] bg-[var(--color-bg)] rounded-xl focus:outline-none focus:bg-white focus:border-[var(--color-rani)] focus:shadow-[4px_4px_0px_var(--color-rani)] transition-all font-bold text-lg"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[var(--color-dark)] text-[var(--color-emerald)] font-black uppercase tracking-widest text-lg p-5 rounded-xl border-4 border-[var(--color-dark)] shadow-[6px_6px_0px_var(--color-emerald)] hover:translate-y-1 hover:shadow-[2px_2px_0px_var(--color-emerald)] active:translate-y-2 active:shadow-none transition-all mt-4 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Brewing Access...' : 'Enter Cafe'}
              {!isLoading && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SplashLogin;
