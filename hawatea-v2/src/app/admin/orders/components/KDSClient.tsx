'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Clock } from 'lucide-react'

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
    { id: 'PENDING', title: 'New Orders', nextStatus: 'PREPARING', actionLabel: 'Accept & Prep', bg: 'bg-red-500' },
    { id: 'PREPARING', title: 'In Kitchen', nextStatus: 'READY', actionLabel: 'Mark Ready', bg: 'bg-yellow-400' },
    { id: 'READY', title: 'Ready for Service', nextStatus: 'COMPLETED', actionLabel: 'Complete', bg: 'bg-green-500' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-[800px]">
      {columns.map(col => {
        const colOrders = orders.filter(o => o.status === col.id || (col.id === 'PENDING' && o.status === 'ACCEPTED'))
        
        return (
          <div key={col.id} className="bg-neutral-800 rounded-xl flex flex-col overflow-hidden border-2 border-neutral-700">
            <div className={`${col.bg} text-black font-black uppercase p-4 flex justify-between items-center shrink-0`}>
              <span>{col.title}</span>
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm">{colOrders.length}</span>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4">
              {colOrders.map(order => (
                <div key={order.id} className="bg-white rounded-lg p-4 shadow-lg border-l-8 border-yellow-400">
                  <div className="flex justify-between items-start mb-3 border-b-2 border-gray-100 pb-2">
                    <div>
                      <span className="font-black text-xl block">#{order.id.split('-')[0]}</span>
                      <span className="text-sm font-bold text-gray-500">{order.customer_name} • {order.table_number}</span>
                    </div>
                    <div className="flex items-center gap-1 text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded">
                      <Clock size={14} />
                      {Math.floor((new Date().getTime() - new Date(order.created_at).getTime()) / 60000)}m
                    </div>
                  </div>
                  
                  <ul className="mb-4 flex flex-col gap-2">
                    {order.order_items?.map((item: any) => (
                      <li key={item.id} className="font-bold flex items-start gap-2">
                        <span className="bg-gray-200 px-2 py-1 rounded text-sm">{item.quantity}x</span>
                        <span className="flex-1">{item.menu_items?.name}</span>
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => updateStatus(order.id, col.nextStatus as OrderStatus)}
                    className="w-full bg-black text-white font-black uppercase py-3 hover:bg-yellow-400 hover:text-black transition-colors rounded"
                  >
                    {col.actionLabel}
                  </button>
                </div>
              ))}
              
              {colOrders.length === 0 && (
                <div className="text-center text-neutral-500 font-bold uppercase mt-10">
                  No orders
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
