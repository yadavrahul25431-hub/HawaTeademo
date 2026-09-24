import React, { useState } from 'react';
import { ArrowRight, Lock, UserCog, Coffee, X } from 'lucide-react';

const StaffLogin = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      alert("This is just a frontend demo. The backend is brewing!");
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[var(--color-dark)]/80 backdrop-blur-md"
        onClick={onClose}
      ></div>

      {/* Main Container */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl border-4 border-[var(--color-dark)] shadow-[12px_12px_0px_var(--color-dark)] overflow-hidden relative z-10 animate-slide-up">
        
        {/* Left Side: Branding / Visual */}
        <div className="bg-[var(--color-marigold)] p-8 lg:p-12 flex flex-col justify-between relative border-r-4 border-[var(--color-dark)] hidden md:flex">
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--color-dark)_2px,transparent_2px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[var(--color-dark)] text-[var(--color-marigold)] flex items-center justify-center rounded-full border-2 border-[var(--color-dark)]">
                <Coffee size={24} strokeWidth={2.5} />
              </div>
              <span className="font-black font-sans text-2xl tracking-widest uppercase">HAWAtea</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black font-sans uppercase leading-[1.1] mb-6 text-[var(--color-dark)]">
              Crew & <br/>
              <span className="text-white drop-shadow-[2px_2px_0px_var(--color-dark)]">Management</span> <br/>
              Portal.
            </h2>
            <p className="font-bold font-serif text-lg max-w-sm text-[var(--color-dark)]">
              Sign in with your Owner or Staff credentials to access the Kitchen Display System and Menu Manager.
            </p>
          </div>
          
          <div className="relative z-10 flex gap-4 mt-12">
            <div className="bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-[var(--color-dark)] font-black uppercase text-sm">Owner Access</div>
            <div className="bg-[var(--color-dark)] text-[var(--color-marigold)] px-4 py-2 rounded-full border-2 border-[var(--color-dark)] font-black uppercase text-sm">Staff Access</div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-[var(--color-bg)] relative">
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--color-marigold)] hover:rotate-90 transition-all border-2 border-transparent hover:border-[var(--color-dark)]"
          >
            <X size={28} strokeWidth={2.5} />
          </button>

          <div className="mb-10 text-center md:text-left mt-8 md:mt-0">
            <div className="w-16 h-16 bg-[var(--color-rani)] text-white rounded-2xl border-4 border-[var(--color-dark)] flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-[4px_4px_0px_var(--color-dark)] -rotate-3">
              <UserCog size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-3xl md:text-4xl font-black font-sans uppercase tracking-tight text-[var(--color-dark)]">Secure Login</h3>
            <p className="text-gray-600 font-bold font-serif mt-2">Enter your authorized credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-6 font-sans">
            <div className="group">
              <label className="block font-black uppercase tracking-wider mb-2 text-sm text-[var(--color-dark)] group-focus-within:text-[var(--color-peacock)] transition-colors">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-4 pl-5 border-4 border-[var(--color-dark)] bg-white rounded-xl focus:outline-none focus:border-[var(--color-peacock)] focus:shadow-[4px_4px_0px_var(--color-peacock)] transition-all font-bold text-lg"
                  placeholder="admin@hawatea.com"
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
                  className="w-full p-4 pl-5 border-4 border-[var(--color-dark)] bg-white rounded-xl focus:outline-none focus:border-[var(--color-rani)] focus:shadow-[4px_4px_0px_var(--color-rani)] transition-all font-bold text-lg"
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
              {isLoading ? 'Authenticating...' : 'Enter System'}
              {!isLoading && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default StaffLogin;
