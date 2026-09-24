'use client'

import { useCartStore } from '@/store/cartStore'
import { useState } from 'react'
import { ShoppingCart, X, Plus, Minus, ArrowRight } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Cart() {
  const { items, getTotal, updateQuantity, removeItem, clearCart } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [tableNumber, setTableNumber] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const router = useRouter()
  const total = getTotal()

  if (items.length === 0) return null

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    
    // 1. Create Order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        table_number: tableNumber || 'Takeaway',
        total_amount: total,
        status: 'PENDING'
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('Error creating order', orderError)
      alert('Failed to place order.')
      setIsSubmitting(false)
      return
    }

    // 2. Create Order Items
    const orderItems = items.map(item => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
      notes: item.notes
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Error adding items', itemsError)
      alert('Failed to place order items.')
      setIsSubmitting(false)
      return
    }

    // Success! Clear cart and redirect to tracking
    clearCart()
    setIsOpen(false)
    router.push(`/track/${order.id}`)
  }

  return (
    <>
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-black text-white px-6 py-4 rounded-full font-black uppercase tracking-widest flex items-center gap-3 border-4 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.5)] hover:scale-105 transition-transform"
        >
          <ShoppingCart size={24} />
          <span>{items.reduce((acc, i) => acc + i.quantity, 0)} Items</span>
          <span className="bg-white text-black px-3 py-1 rounded-full">${total.toFixed(2)}</span>
        </button>
      </div>

      {/* Cart Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full flex flex-col border-l-8 border-black animate-slide-in-right">
            
            <div className="bg-black text-white p-6 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase tracking-widest text-yellow-400">Your Order</h2>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.map(item => (
                <div key={item.menu_item_id} className="flex justify-between items-start border-b-2 border-gray-200 pb-4">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-500 font-bold">${item.unit_price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl">
                    <button onClick={() => updateQuantity(item.menu_item_id, item.quantity - 1)} className="hover:text-red-500">
                      <Minus size={18} />
                    </button>
                    <span className="font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.menu_item_id, item.quantity + 1)} className="hover:text-green-500">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-gray-100 border-t-4 border-black">
              <div className="flex justify-between items-center mb-6 text-xl">
                <span className="font-black uppercase">Total:</span>
                <span className="font-black">${total.toFixed(2)}</span>
              </div>
              
              <form onSubmit={handleCheckout} className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name (Required)" 
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full p-4 border-2 border-black font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
                <input 
                  type="text" 
                  placeholder="Table Number (Leave blank for takeaway)" 
                  value={tableNumber}
                  onChange={e => setTableNumber(e.target.value)}
                  className="w-full p-4 border-2 border-black font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-lg"
                />
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-yellow-400 text-black font-black uppercase text-xl p-4 flex items-center justify-center gap-2 border-4 border-black shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Order...' : 'Place Order'}
                  {!isSubmitting && <ArrowRight size={24} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
