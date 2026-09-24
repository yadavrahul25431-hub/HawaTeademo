import { createClient } from '@/utils/supabase/server'
import TrackerClient from './components/TrackerClient'
import { notFound } from 'next/navigation'

export default async function TrackOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = await params
  const supabase = await createClient()

  // Fetch initial order state
  const { data: order, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single()

  if (error || !order) {
    notFound()
  }

  // Fetch order items for display
  const { data: orderItems } = await supabase
    .from('order_items')
    .select('*, menu_items(name)')
    .eq('order_id', orderId)

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <header className="bg-black text-white p-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-center text-yellow-400">Order Tracker</h1>
      </header>

      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8 max-w-3xl">
        <div className="bg-white p-8 border-4 border-black shadow-[8px_8px_0px_#000] rounded-xl flex flex-col gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase mb-2">Order #{order.id.split('-')[0]}</h2>
            <p className="text-gray-500 font-bold uppercase">{order.customer_name} • {order.table_number}</p>
          </div>

          <TrackerClient initialOrder={order} />

          <div className="border-t-2 border-dashed border-gray-300 pt-6 mt-6">
            <h3 className="font-black uppercase mb-4 text-xl">Order Summary</h3>
            <ul className="flex flex-col gap-3">
              {orderItems?.map((item: any) => (
                <li key={item.id} className="flex justify-between font-bold">
                  <span>{item.quantity}x {item.menu_items?.name}</span>
                  <span>${(item.unit_price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-black text-xl mt-6 border-t-4 border-black pt-4">
              <span>TOTAL</span>
              <span>${order.total_amount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
