'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lock, UserCog, Coffee } from 'lucide-react'

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
    <div className="min-h-screen bg-[#FFF8EB] text-[#121212] font-sans relative overflow-hidden flex items-center justify-center p-4">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#0055FF] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-[#FF0066] rounded-full mix-blend-multiply filter blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[40%] left-[20%] w-64 h-64 bg-[#FF9900] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white rounded-3xl border-4 border-[#121212] shadow-[12px_12px_0px_#121212] overflow-hidden relative z-10">
        
        {/* Left Side: Branding / Visual */}
        <div className="bg-[#FF9900] p-12 flex flex-col justify-between relative border-r-4 border-[#121212] hidden md:flex">
          {/* Abstract pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#121212_2px,transparent_2px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#121212] text-[#FF9900] flex items-center justify-center rounded-full border-2 border-[#121212]">
                <Coffee size={24} strokeWidth={2.5} />
              </div>
              <span className="font-black text-2xl tracking-widest uppercase">HAWAtea</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-black uppercase leading-[1.1] mb-6">
              Crew & <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#121212] to-[#0055FF]">Management</span> <br/>
              Portal.
            </h1>
            <p className="font-bold text-lg max-w-sm">
              Sign in with your Owner or Staff credentials to access the Kitchen Display System and Menu Manager.
            </p>
          </div>
          
          <div className="relative z-10 flex gap-4 mt-12">
            <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-[#121212] font-black uppercase text-sm">Owner Access</div>
            <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-[#121212] font-black uppercase text-sm">Staff Access</div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative">
          
          <div className="mb-10 text-center md:text-left">
            <div className="w-16 h-16 bg-[#FF0066] text-white rounded-2xl border-4 border-[#121212] flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-[4px_4px_0px_#121212] -rotate-3">
              <UserCog size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Secure Login</h2>
            <p className="text-gray-500 font-bold mt-2">Enter your authorized credentials.</p>
          </div>
          
          {error && (
            <div className="bg-[#FF0066]/10 text-[#D40055] p-4 mb-8 border-2 border-[#D40055] rounded-xl font-bold flex items-center gap-3">
              <Lock size={20} />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div className="group">
              <label className="block font-black uppercase tracking-wider mb-2 text-sm text-gray-700 group-focus-within:text-[#0055FF] transition-colors">Email Address</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full p-4 pl-5 border-4 border-[#121212] bg-gray-50 rounded-xl focus:outline-none focus:bg-white focus:border-[#0055FF] focus:shadow-[4px_4px_0px_#0055FF] transition-all font-bold text-lg"
                  placeholder="admin@hawatea.com"
                  required
                />
              </div>
            </div>
            
            <div className="group">
              <label className="block font-black uppercase tracking-wider mb-2 text-sm text-gray-700 group-focus-within:text-[#FF0066] transition-colors">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full p-4 pl-5 border-4 border-[#121212] bg-gray-50 rounded-xl focus:outline-none focus:bg-white focus:border-[#FF0066] focus:shadow-[4px_4px_0px_#FF0066] transition-all font-bold text-lg"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#121212] text-white font-black uppercase tracking-widest text-lg p-5 rounded-xl border-4 border-[#121212] shadow-[6px_6px_0px_#00B359] hover:translate-y-1 hover:shadow-[2px_2px_0px_#00B359] active:translate-y-2 active:shadow-none transition-all mt-4 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authenticating...' : 'Enter System'}
              {!isLoading && <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
          
          <div className="mt-12 text-center">
            <a href="/" className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-[#FF0066] transition-colors border-b-2 border-transparent hover:border-[#FF0066] pb-1">
              <ArrowRight size={16} className="rotate-180" />
              Return to Customer Menu
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}
