import React, { useState } from 'react';
import { X, Calendar, Clock, Users, ArrowRight } from 'lucide-react';

const ReservationModal = ({ isOpen, onClose }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[var(--color-teakwood)]/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-[var(--color-cream)] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-[dropdown-in_0.3s_ease-out]">
        
        {/* Header */}
        <div className="bg-[var(--color-teakwood)] p-6 text-white flex justify-between items-center relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-saffron)]/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-['Playfair_Display']">Reserve a Table</h3>
            <p className="text-sm text-[var(--color-cream-dark)] opacity-80 mt-1">Experience the soul of India.</p>
          </div>
          
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors relative z-10"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Form Body */}
        <div className="p-8">
          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); alert("Your table is reserved! We can't wait to host you."); onClose(); }}>
            
            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[var(--color-teakwood-light)] uppercase tracking-wide">Date</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-teakwood-light)]">
                  <Calendar size={18} />
                </div>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white border border-[var(--color-cream-dark)] rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-saffron)] focus:ring-1 focus:ring-[var(--color-saffron)] transition-all font-medium text-[var(--color-teakwood)]"
                  required
                />
              </div>
            </div>

            {/* Time & Guests Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[var(--color-teakwood-light)] uppercase tracking-wide">Time</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-teakwood-light)]">
                    <Clock size={18} />
                  </div>
                  <select 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-white border border-[var(--color-cream-dark)] rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-saffron)] focus:ring-1 focus:ring-[var(--color-saffron)] transition-all font-medium text-[var(--color-teakwood)] appearance-none"
                    required
                  >
                    <option value="" disabled>Select</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">01:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="17:00">05:00 PM</option>
                    <option value="19:00">07:00 PM</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-[var(--color-teakwood-light)] uppercase tracking-wide">Party Size</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-teakwood-light)]">
                    <Users size={18} />
                  </div>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-white border border-[var(--color-cream-dark)] rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[var(--color-saffron)] focus:ring-1 focus:ring-[var(--color-saffron)] transition-all font-medium text-[var(--color-teakwood)] appearance-none"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ People</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-[var(--color-teakwood-light)] uppercase tracking-wide">Special Requests (Optional)</label>
              <textarea 
                rows="2"
                placeholder="Anniversary, corner table..."
                className="w-full bg-white border border-[var(--color-cream-dark)] rounded-xl p-4 focus:outline-none focus:border-[var(--color-saffron)] focus:ring-1 focus:ring-[var(--color-saffron)] transition-all font-medium text-[var(--color-teakwood)] resize-none"
              />
            </div>

            {/* Submit */}
            <button 
              type="submit"
              className="mt-4 w-full py-4 btn-primary rounded-xl font-bold flex justify-center items-center gap-2 group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                Confirm Reservation
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <p className="text-xs text-center text-[var(--color-teakwood-light)] opacity-70">
              By confirming, you agree to our table reservation policy.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationModal;
