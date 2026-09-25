import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, UtensilsCrossed, LogOut, Coffee } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="h-screen bg-neutral-950 text-neutral-100 flex font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside className="w-72 bg-neutral-900/50 border-r border-neutral-800/50 backdrop-blur-xl flex flex-col shrink-0 transition-all duration-300">
        <div className="h-20 flex items-center px-8 border-b border-neutral-800/50">
          <Link href="/admin/orders" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 flex items-center justify-center rounded-xl border border-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <Coffee size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-indigo-400 transition-colors">HAWAtea.</span>
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-8 px-4 flex flex-col gap-2">
          <div className="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">Management</div>
          
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-800/50 text-neutral-300 hover:text-white transition-all duration-200 group">
            <LayoutDashboard size={20} className="text-neutral-400 group-hover:text-indigo-400 transition-colors" />
            <span className="font-medium">Kitchen Display</span>
          </Link>
          
          <Link href="/admin/menu" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-800/50 text-neutral-300 hover:text-white transition-all duration-200 group">
            <UtensilsCrossed size={20} className="text-neutral-400 group-hover:text-indigo-400 transition-colors" />
            <span className="font-medium">Menu Manager</span>
          </Link>
        </div>

        <div className="p-4 border-t border-neutral-800/50">
          <div className="bg-neutral-900 rounded-xl p-4 border border-neutral-800/50 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user.email}</p>
                <p className="text-xs text-neutral-500">Administrator</p>
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none -z-10" />
        
        <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
          {children}
        </div>
      </main>
    </div>
  )
}
