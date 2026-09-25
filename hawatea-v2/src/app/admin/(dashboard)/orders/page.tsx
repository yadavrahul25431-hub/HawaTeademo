import { createClient } from '@/utils/supabase/server'
import KDSClient from './components/KDSClient'
import { redirect } from 'next/navigation'

export default async function AdminOrdersPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin/login')
  }

  // Fetch initial active orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*, menu_items(name))')
    .neq('status', 'COMPLETED')
    .neq('status', 'CANCELLED')
    .order('created_at', { ascending: true })

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <header className="p-8 pb-4 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Kitchen Display System</h1>
        <p className="text-neutral-400 font-medium">Real-time order management and fulfillment.</p>
      </header>

      <main className="flex-1 overflow-x-auto p-8 pt-0 min-h-0">
        <KDSClient initialOrders={orders || []} />
      </main>
    </div>
  )
}
