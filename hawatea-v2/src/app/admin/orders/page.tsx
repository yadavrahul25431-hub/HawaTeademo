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
    <div className="min-h-screen bg-neutral-900 flex flex-col h-screen overflow-hidden">
      <header className="bg-black border-b-4 border-yellow-400 p-4 flex justify-between items-center shrink-0">
        <h1 className="text-2xl font-black uppercase tracking-widest text-yellow-400">Kitchen Display System</h1>
        <div className="flex gap-4">
          <a href="/admin/menu" className="text-white font-bold hover:text-yellow-400">Menu Manager</a>
          <span className="text-gray-500">|</span>
          <span className="text-white font-bold">{user.email}</span>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto p-6">
        <KDSClient initialOrders={orders || []} />
      </main>
    </div>
  )
}
