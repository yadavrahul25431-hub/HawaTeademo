import { createClient } from '@/utils/supabase/server'
import MenuGrid from './components/MenuGrid'
import Cart from './components/Cart'

export default async function MenuPage() {
  const supabase = await createClient()

  // Fetch available menu items
  const { data: menuItems, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('is_available', true)
    .order('category')

  if (error) {
    console.error('Error fetching menu items:', error)
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-32">
      <header className="bg-black text-white p-6 sticky top-0 z-10">
        <h1 className="text-3xl font-black uppercase tracking-widest text-yellow-400">HAWAtea</h1>
        <p className="text-sm font-medium tracking-wide">Digital Ordering Menu</p>
      </header>

      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <MenuGrid items={menuItems || []} />
      </main>

      <Cart />
    </div>
  )
}
