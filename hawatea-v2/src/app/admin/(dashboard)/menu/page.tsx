'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Search, Plus, Filter, MoreHorizontal, Check, X } from 'lucide-react'

export default function MenuManager() {
  const [items, setItems] = useState<any[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchMenu = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('menu_items').select('*').order('category')
      if (data) setItems(data)
    }
    fetchMenu()
  }, [])

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    const supabase = createClient()
    // Optimistic update
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_available: !currentStatus } : i))
    await supabase.from('menu_items').update({ is_available: !currentStatus }).eq('id', id)
  }

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <header className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Menu Manager</h1>
          <p className="text-neutral-400 font-medium">Manage your offerings, categories, and availability.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-neutral-700">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all">
            <Plus size={16} />
            Add Item
          </button>
        </div>
      </header>

      <div className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl flex-1 flex flex-col overflow-hidden backdrop-blur-sm">
        {/* Toolbar */}
        <div className="p-4 border-b border-neutral-800/80 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
            <input 
              type="text" 
              placeholder="Search menu items..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-neutral-600"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-neutral-950/50 sticky top-0 z-10">
              <tr>
                <th className="py-3 px-6 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800">Item Details</th>
                <th className="py-3 px-6 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800">Category</th>
                <th className="py-3 px-6 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800">Price</th>
                <th className="py-3 px-6 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800 text-center">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-neutral-400 uppercase tracking-wider border-b border-neutral-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-neutral-800/30 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="font-medium text-white">{item.name}</div>
                    {item.description && <div className="text-xs text-neutral-500 mt-1 truncate max-w-xs">{item.description}</div>}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-neutral-300">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => toggleAvailability(item.id, item.is_available)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${item.is_available ? 'bg-indigo-600' : 'bg-neutral-700'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${item.is_available ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-neutral-500 hover:text-white transition-colors p-1 rounded-lg hover:bg-neutral-700">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-neutral-500 font-medium">
                    No menu items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
