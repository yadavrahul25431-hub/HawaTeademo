'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Clock, ChefHat, CheckCircle2, AlertCircle } from 'lucide-react'

type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED'

export default function KDSClient({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders)

  useEffect(() => {
    const supabase = createClient()
    
    // Subscribe to new orders or status updates
    const channel = supabase.channel('kds-orders')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        async (payload) => {
          // If insert, fetch the order with items
          if (payload.eventType === 'INSERT') {
            const { data } = await supabase
              .from('orders')
              .select('*, order_items(*, menu_items(name))')
              .eq('id', payload.new.id)
              .single()
            if (data) {
              setOrders(prev => [...prev, data])
            }
          } else if (payload.eventType === 'UPDATE') {
            // If updated to complete/cancel, remove from KDS
            if (payload.new.status === 'COMPLETED' || payload.new.status === 'CANCELLED') {
              setOrders(prev => prev.filter(o => o.id !== payload.new.id))
            } else {
              setOrders(prev => prev.map(o => o.id === payload.new.id ? { ...o, ...payload.new } : o))
            }
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const updateStatus = async (orderId: string, newStatus: OrderStatus) => {
    const supabase = createClient()
    // Optimistic update
    setOrders(prev => {
      if (newStatus === 'COMPLETED' || newStatus === 'CANCELLED') {
        return prev.filter(o => o.id !== orderId)
      }
      return prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
    })

    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
  }

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
      actionLabel: 'Complete Order', 
      headerColor: 'text-emerald-400', 
      borderColor: 'border-emerald-500/50',
      bgColor: 'bg-emerald-500/10',
      icon: <CheckCircle2 size={18} />
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full min-h-0">
      {columns.map(col => {
        const colOrders = orders.filter(o => o.status === col.id || (col.id === 'PENDING' && o.status === 'ACCEPTED'))
        
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
                <div key={order.id} className="bg-neutral-900 rounded-xl p-5 border border-neutral-800 shadow-sm transition-all hover:shadow-md hover:border-neutral-700 group">
                  <div className="flex justify-between items-start mb-4 border-b border-neutral-800 pb-3">
                    <div>
                      <span className="font-bold text-lg text-white block">#{order.id.split('-')[0]}</span>
                      <span className="text-sm font-medium text-neutral-400">{order.customer_name} • Table {order.table_number}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-400 font-medium text-xs bg-neutral-800 px-2.5 py-1 rounded-md">
                      <Clock size={14} />
                      {Math.floor((new Date().getTime() - new Date(order.created_at).getTime()) / 60000)}m
                    </div>
                  </div>
                  
                  <ul className="mb-5 flex flex-col gap-2.5">
                    {order.order_items?.map((item: any) => (
                      <li key={item.id} className="flex items-start gap-3">
                        <span className="bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded text-xs font-bold mt-0.5">{item.quantity}x</span>
                        <span className="flex-1 text-sm text-neutral-200 font-medium leading-snug">{item.menu_items?.name}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => updateStatus(order.id, col.nextStatus as OrderStatus)}
                    className="w-full bg-neutral-800 hover:bg-indigo-600 text-white font-semibold text-sm py-2.5 rounded-lg transition-colors border border-neutral-700 hover:border-indigo-500"
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
        )
      })}
    </div>
  )
}
