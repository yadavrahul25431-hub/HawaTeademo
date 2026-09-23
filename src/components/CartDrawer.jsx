import React, { useState } from 'react';
import { X, Plus, Minus, ArrowRight } from 'lucide-react';

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity }) => {
  const [tip, setTip] = useState(20);
  const [orderMode, setOrderMode] = useState('pickup');
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal > 0 ? subtotal + tip : 0;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-[var(--color-dark)]/80 backdrop-blur-sm z-[100] transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[var(--color-bg)] border-l-[6px] border-[var(--color-dark)] shadow-[-12px_0px_0px_var(--color-rani)] z-[110] transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-[110%]'
        }`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-[2px] border-[var(--color-dark)] bg-white">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-[var(--color-marigold)]" />
            <h2 className="text-2xl font-black font-sans uppercase tracking-tight text-[var(--color-dark)]">Your Tray</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-[var(--color-bg)] rounded-full text-[var(--color-dark)] hover:bg-[var(--color-marigold)] transition-all active:scale-95"
          >
            <X size={24} strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
          
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70">
              <div className="text-6xl mb-6">🛒</div>
              <p className="font-black font-sans uppercase text-2xl text-[var(--color-dark)]">Tray is Empty</p>
              <p className="font-medium font-serif text-lg mt-2 text-[var(--color-dark)]/70">Time to brew something bold.</p>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex flex-col gap-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 border-[2px] border-[var(--color-dark)] rounded-2xl p-4 bg-white shadow-sm">
                    <div className="flex-1">
                      <h4 className="font-black font-sans text-lg uppercase leading-tight mb-2 text-[var(--color-dark)]">{item.name}</h4>
                      {item.description && (
                        <p className="font-sans font-bold text-[10px] uppercase text-[var(--color-dark)]/70 bg-[var(--color-bg)] rounded-md px-2 py-1 mb-3 leading-tight inline-block">{item.description}</p>
                      )}
                      <div className="font-sans font-black text-xl text-[var(--color-emerald)]">₹{item.price * item.quantity}</div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <div className="flex items-center bg-[var(--color-bg)] rounded-full border-[2px] border-[var(--color-dark)] overflow-hidden">
                        <button 
                          onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                          className="p-2 hover:bg-[var(--color-dark)] hover:text-white transition-colors"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>
                        <span className="font-sans font-bold w-8 text-center text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                          className="p-2 hover:bg-[var(--color-dark)] hover:text-white transition-colors"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Kitchen Notes */}
              <div className="flex flex-col gap-2 mt-4">
                <label className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--color-dark)]">Kitchen Notes</label>
                <textarea 
                  rows="2"
                  placeholder="Extra hot, less ice, etc..."
                  className="w-full bg-white border-[2px] border-[var(--color-dark)] rounded-xl p-3 font-sans text-sm resize-none focus:outline-none focus:border-[var(--color-peacock)] transition-colors text-[var(--color-dark)]"
                />
              </div>

              {/* Mode Toggle */}
              <div className="flex flex-col gap-2">
                <label className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--color-dark)]">Order Mode</label>
                <div className="flex border-[2px] border-[var(--color-dark)] rounded-full bg-[var(--color-bg)] p-1 gap-1">
                  <button 
                    onClick={() => setOrderMode('pickup')}
                    className={`flex-1 py-2 rounded-full font-bold uppercase text-xs transition-all ${orderMode === 'pickup' ? 'bg-[var(--color-dark)] text-white' : 'hover:bg-white text-[var(--color-dark)]'}`}
                  >
                    Pickup (8 Min)
                  </button>
                  <button 
                    onClick={() => setOrderMode('delivery')}
                    className={`flex-1 py-2 rounded-full font-bold uppercase text-xs transition-all ${orderMode === 'delivery' ? 'bg-[var(--color-dark)] text-white' : 'hover:bg-white text-[var(--color-dark)]'}`}
                  >
                    Delivery (25 Min)
                  </button>
                </div>
              </div>

              {/* Tip Selector */}
              <div className="flex flex-col gap-2 pb-4">
                <label className="font-sans text-xs font-bold uppercase tracking-widest text-[var(--color-dark)]">Tip the Brewers</label>
                <div className="flex flex-wrap gap-2">
                  {[20, 50, 100].map(amt => (
                    <button 
                      key={amt}
                      onClick={() => setTip(amt)}
                      className={`flex-1 py-2 rounded-xl font-bold text-sm border-[2px] border-[var(--color-dark)] transition-all ${tip === amt ? 'bg-[var(--color-emerald)] text-white border-[var(--color-emerald)]' : 'bg-white text-[var(--color-dark)] hover:bg-[var(--color-bg)]'}`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

            </>
          )}

        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-white border-t-[2px] border-[var(--color-dark)] flex flex-col gap-4">
            <div className="flex justify-between items-center font-sans font-bold text-sm text-[var(--color-dark)] uppercase">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center font-sans font-bold text-sm text-[var(--color-dark)] uppercase border-b-[2px] border-dashed border-gray-200 pb-4">
              <span>Tip</span>
              <span>₹{tip}</span>
            </div>
            <div className="flex justify-between items-end pt-2 mb-4">
              <span className="font-bold uppercase text-lg text-[var(--color-dark)]">Total</span>
              <span className="font-sans font-black text-3xl text-[var(--color-dark)]">₹{total}</span>
            </div>

            <button className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2">
              SLIDE TO PLACE ORDER
              <ArrowRight size={20} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default CartDrawer;
