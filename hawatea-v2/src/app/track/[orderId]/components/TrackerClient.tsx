'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CheckCircle2, Clock, ChefHat, CheckSquare } from 'lucide-react'

export type OrderStatus = 'PENDING' | 'ACCEPTED' | 'PREPARING' | 'READY' | 'COMPLETED' | 'CANCELLED'

const STATUS_STEPS = [
  { id: 'PENDING', label: 'Order Placed', icon: Clock },
  { id: 'ACCEPTED', label: 'Confirmed', icon: CheckSquare },
  { id: 'PREPARING', label: 'In the Kitchen', icon: ChefHat },
  { id: 'READY', label: 'Ready for You', icon: CheckCircle2 }
]

export default function TrackerClient({ initialOrder }: { initialOrder: any }) {
  const [order, setOrder] = useState(initialOrder)

  useEffect(() => {
    const supabase = createClient()
    
    const channel = supabase.channel(`order-tracker-${order.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${order.id}`
        },
        (payload) => {
          console.log('Order updated!', payload)
          setOrder(payload.new)
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [order.id])

  if (order.status === 'CANCELLED') {
    return (
      <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center font-black uppercase text-xl border-4 border-red-700">
        This order has been cancelled.
      </div>
    )
  }

  if (order.status === 'COMPLETED') {
    return (
      <div className="bg-green-100 text-green-700 p-6 rounded-lg text-center font-black uppercase text-xl border-4 border-green-700">
        Order Completed. Enjoy!
      </div>
    )
  }

  const currentStepIndex = STATUS_STEPS.findIndex(s => s.id === order.status)
  
  return (
    <div className="flex flex-col gap-6">
      {STATUS_STEPS.map((step, index) => {
        const Icon = step.icon
        const isCompleted = index <= currentStepIndex
        const isCurrent = index === currentStepIndex

        return (
          <div key={step.id} className={`flex items-center gap-4 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${isCurrent ? 'border-yellow-400 bg-black text-yellow-400 scale-110' : isCompleted ? 'border-black bg-black text-white' : 'border-gray-400 text-gray-400'}`}>
              <Icon size={24} />
            </div>
            <div className="flex-1 border-b-2 border-dashed border-gray-200 pb-2">
              <h4 className={`text-xl font-black uppercase ${isCurrent ? 'text-black' : 'text-gray-500'}`}>
                {step.label}
              </h4>
              {isCurrent && <p className="text-sm font-bold text-yellow-600">Currently active</p>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
