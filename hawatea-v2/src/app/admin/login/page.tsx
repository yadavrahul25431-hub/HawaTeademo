'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, Coffee } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    const supabase = createClient()
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setIsLoading(false)
      return
    }

    // Role check is handled by middleware, so we just push
    router.push('/admin/orders')
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans selection:bg-indigo-500/30">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="flex-1 flex flex-col justify-center items-center p-6 relative z-10">
        
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-neutral-900 border border-neutral-800 text-indigo-400 flex items-center justify-center rounded-2xl mb-6 shadow-xl shadow-indigo-500/10">
              <Coffee size={32} strokeWidth={2} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Management Portal</h1>
            <p className="text-neutral-400 font-medium text-center">Sign in to access the Kitchen Display System and Menu Manager.</p>
          </div>

          {/* Login Card */}
          <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-8 shadow-2xl">
            {error && (
              <div className="bg-red-500/10 text-red-400 p-4 mb-6 border border-red-500/20 rounded-xl font-medium flex items-center gap-3 text-sm">
                <Lock size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-neutral-300">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
                  placeholder="admin@hawatea.com"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-neutral-300">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all mt-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Authenticating...' : 'Sign In'}
                {!isLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-white transition-colors">
              <ArrowRight size={14} className="rotate-180" />
              Return to Customer Site
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
