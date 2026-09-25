import React, { useState } from 'react';
import { Clock, Check, RefreshCw, LogOut, FileText, Settings, Users, ChefHat, CheckCircle2, AlertCircle, Coffee } from 'lucide-react';

const StaffDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('orders');

  const [orders, setOrders] = useState([
    { id: '1021', customer: 'Rahul Y.', table: 'T-04', items: [{ qty: 2, name: 'Masala Chai' }, { qty: 1, name: 'Samosa' }], status: 'PENDING', time: '2m' },
    { id: '1022', customer: 'Aisha K.', table: 'Takeaway', items: [{ qty: 1, name: 'Cardamom Chai' }], status: 'PREPARING', time: '5m' },
    { id: '1023', customer: 'Dev S.', table: 'T-01', items: [{ qty: 3, name: 'Cutting Chai' }, { qty: 2, name: 'Bun Maska' }], status: 'READY', time: '10m' }
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o).filter(o => o.status !== 'COMPLETED'));
  };

  const columns = [
    { 
      id: 'PENDING', 
      title: 'New Orders', 
      nextStatus: 'PREPARING', 
      actionLabel: 'Accept & Prep', 
      headerColor: 'text-rose-400', 
      borderColor: 'border-rose-500/50',
      bgColor: 'bg-rose-500/10',
      icon: <AlertCircle size={18} />
    },
    { 
      id: 'PREPARING', 
      title: 'In Kitchen', 
      nextStatus: 'READY', 
      actionLabel: 'Mark Ready', 
      headerColor: 'text-amber-400', 
      borderColor: 'border-amber-500/50',
      bgColor: 'bg-amber-500/10',
      icon: <ChefHat size={18} />
    },
    { 
      id: 'READY', 
      title: 'Ready for Service', 
      nextStatus: 'COMPLETED', 
      actionLabel: 'Complete', 
      headerColor: 'text-emerald-400', 
      borderColor: 'border-emerald-500/50',
      bgColor: 'bg-emerald-500/10',
      icon: <CheckCircle2 size={18} />
    }
  ];

  return (
    <div className="h-screen bg-neutral-950 text-neutral-100 font-sans flex overflow-hidden selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <aside className="w-72 bg-neutral-900/50 border-r border-neutral-800/50 backdrop-blur-xl flex flex-col shrink-0">
        <div className="h-20 flex items-center px-8 border-b border-neutral-800/50">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 flex items-center justify-center rounded-xl border border-indigo-500/20">
              <Coffee size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">HAWAtea.</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
          <div className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Management</div>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-white'}`}
          >
            <RefreshCw size={20} className={activeTab === 'orders' ? 'text-white' : 'text-neutral-400'} /> 
            Kitchen Display
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'menu' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-white'}`}
          >
            <FileText size={20} className={activeTab === 'menu' ? 'text-white' : 'text-neutral-400'} /> 
            Menu Manager
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'staff' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-white'}`}
          >
            <Users size={20} className={activeTab === 'staff' ? 'text-white' : 'text-neutral-400'} /> 
            Crew
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'settings' ? 'bg-indigo-600 text-white shadow-md' : 'text-neutral-300 hover:bg-neutral-800/50 hover:text-white'}`}
          >
            <Settings size={20} className={activeTab === 'settings' ? 'text-white' : 'text-neutral-400'} /> 
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-neutral-800/50">
          <button 
            onClick={onLogout}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-all duration-200 text-sm font-semibold"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none -z-10" />
        
        <header className="p-8 pb-4 shrink-0 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Kitchen Display</h1>
            <p className="text-neutral-400 font-medium">Real-time order management and fulfillment.</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            System Online
          </div>
        </header>

        <div className="flex-1 overflow-x-auto p-8 pt-0 flex flex-col min-h-0">
          {activeTab === 'orders' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
              {columns.map(col => {
                const colOrders = orders.filter(o => o.status === col.id);
                
                return (
                  <div key={col.id} className="bg-neutral-900/40 rounded-2xl flex flex-col overflow-hidden border border-neutral-800/80 backdrop-blur-sm">
                    <div className={`px-5 py-4 border-b border-neutral-800/80 flex justify-between items-center shrink-0 ${col.bgColor}`}>
                      <div className={`flex items-center gap-2 font-semibold ${col.headerColor}`}>
                        {col.icon}
                        <span>{col.title}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${col.headerColor} bg-neutral-950/50 border ${col.borderColor}`}>
                        {colOrders.length}
                      </span>
                    </div>
                    
                    <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
                      {colOrders.map(order => (
                        <div key={order.id} className="shrink-0 bg-neutral-900 rounded-xl p-5 border border-neutral-800 shadow-sm transition-all hover:shadow-md hover:border-neutral-700">
                          <div className="flex justify-between items-start mb-4 border-b border-neutral-800 pb-3">
                            <div>
                              <span className="font-bold text-lg text-white block">#{order.id}</span>
                              <span className="text-sm font-medium text-neutral-400">{order.customer} • {order.table}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-neutral-400 font-medium text-xs bg-neutral-800 px-2.5 py-1 rounded-md">
                              <Clock size={14} />
                              {order.time}
                            </div>
                          </div>
                          
                          <ul className="mb-5 flex flex-col gap-2.5">
                            {order.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-xs font-bold mt-0.5">{item.qty}x</span>
                                <span className="flex-1 text-sm text-neutral-200 font-medium leading-snug">{item.name}</span>
                              </li>
                            ))}
                          </ul>

                          <button 
                            onClick={() => updateStatus(order.id, col.nextStatus)}
                            className="w-full bg-neutral-800 hover:bg-indigo-600 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors border border-neutral-700 hover:border-indigo-500 flex justify-center items-center gap-2"
                          >
                            {col.actionLabel}
                          </button>
                        </div>
                      ))}
                      
                      {colOrders.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-40 text-neutral-500 gap-2">
                          <div className="w-12 h-12 rounded-full bg-neutral-800/50 flex items-center justify-center">
                            <CheckCircle2 size={24} className="text-neutral-600" />
                          </div>
                          <span className="text-sm font-medium">No orders in queue</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-neutral-900/40 rounded-2xl border border-neutral-800/80 flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center mb-6 border border-neutral-700">
                <Settings size={32} className="text-neutral-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Module Offline</h2>
              <p className="text-neutral-400 max-w-md text-center font-medium">The {activeTab} module is currently under development. Please check back after the next system update.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StaffDashboard;
