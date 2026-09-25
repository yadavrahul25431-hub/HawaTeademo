'use client'

import { createClient } from '@/utils/supabase/client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 text-sm font-medium"
    >
      <LogOut size={16} />
      Sign Out
    </button>
  )
}
