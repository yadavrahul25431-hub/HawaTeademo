'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function MenuManager() {
  const [items, setItems] = useState<any[]>([])

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
    setItems(prev => prev.map(i => i.id === id ? { ...i, is_available: !currentStatus } : i))
    await supabase.from('menu_items').update({ is_available: !currentStatus }).eq('id', id)
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black uppercase tracking-widest">Menu Manager</h1>
          <a href="/admin/orders" className="bg-black text-white px-6 py-2 font-bold uppercase hover:bg-yellow-400 hover:text-black transition-colors">
            Back to KDS
          </a>
        </header>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_#000] rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-4 font-black uppercase">Item Name</th>
                <th className="p-4 font-black uppercase">Category</th>
                <th className="p-4 font-black uppercase">Price</th>
                <th className="p-4 font-black uppercase text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id} className={idx !== items.length - 1 ? 'border-b-2 border-gray-200' : ''}>
                  <td className="p-4 font-bold">{item.name}</td>
                  <td className="p-4 font-bold text-gray-500">{item.category}</td>
                  <td className="p-4 font-bold">${item.price.toFixed(2)}</td>
                  <td className="p-4 flex justify-center">
                    <button 
                      onClick={() => toggleAvailability(item.id, item.is_available)}
                      className={`px-4 py-2 font-black uppercase rounded ${item.is_available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                    >
                      {item.is_available ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
